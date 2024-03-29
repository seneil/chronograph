import dayjs from 'dayjs';

import { knex } from '@application/connection';

import { activeTimingStart, ActivityDay, CurrentActivityView, TimingTable } from '@application/types';

const fetchTiming = async (timingId: number) => (
  await knex<TimingTable>('timings')
    .select('activity_id')
    .where({ id: timingId })
);

export const completeActiveTiming = async (startTime: string) => (
  await knex<TimingTable>('timings')
    .where({ end_at: null })
    .update({ end_at: startTime })
);

export const insertTiming = async (activityId: number, startTime: string, endTime: string | null) => (
  await knex<TimingTable>('timings')
    .insert({ activity_id: activityId, start_at: startTime, end_at: endTime })
);

export const fetchActiveTiming = async (): Promise<CurrentActivityView | null> => {
  const [activeTimingDate] = await knex.raw<activeTimingStart[]>(`
    select
        date(timings.start_at) as start_date_at
    from
        main.timings
    where
        timings.end_at is null
  `);

  if (!activeTimingDate) return null;

  const timingsByDay = await knex.raw<CurrentActivityView[]>(`
    select
        timings.id as timing_id,
        categories.id as category_id,
        categories.name as category_name,
        activities.id as activity_id,
        activities.name as activity_name,
        timings.start_at as start_at,
        timings.end_at as end_at,
        timings.description as description,
        (strftime('%s', timings.end_at) - strftime('%s', timings.start_at)) / 60 as duration
    from
        main.timings
    left join main.activities on timings.activity_id = activities.id
    left join main.categories on activities.category_id = categories.id
    where
        date(timings.start_at) = ?`, [activeTimingDate.start_date_at]);

  const [activeTiming] = timingsByDay.filter(timing => timing.end_at === null);

  const duration = Math.ceil(timingsByDay.reduce((total, timing) => {
    const rowDuration = timing.end_at
      ? dayjs(timing.end_at).diff(dayjs(timing.start_at), 'minute')
      : 0;

    return total + rowDuration;
  }, 0));

  return activeTiming ? { ...activeTiming, duration } : null;
};

export const stopTiming = async () => (
  await completeActiveTiming(new Date().toISOString())
);

export const repeatTiming = async (timingId: number) => {
  const currentTime = new Date().toISOString();

  const [timing] = await fetchTiming(timingId);

  await completeActiveTiming(currentTime);
  await insertTiming(timing.activity_id, currentTime, null);
};

export const deleteTiming = async (timingId: number) => (
  await knex<TimingTable>('timings')
    .where({ id: timingId })
    .delete()
);

export const getPreviousActivityDay = async (dayStart: string) => (
  await knex.raw<ActivityDay[]>(`select
        date(timings.start_at) as activityDay
    from
        main.timings
    where date(timings.start_at) < ?
    group by activityDay
    order by timings.start_at desc
    limit 1;`, [dayStart])
  );

export const getNextActivityDay = async (dayEnd: string) => (
  await knex.raw<ActivityDay[]>(`select
    date(timings.start_at) as activityDay
    from
        main.timings
    where date(timings.start_at) > ?
    group by activityDay
    order by timings.start_at asc
    limit 1;`, [dayEnd])
  );
