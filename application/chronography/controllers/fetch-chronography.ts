import dayjs from 'dayjs';

import { knex } from '@application/connection';

import { fetchActiveTiming } from '@application/chronography/controllers/timings';

import { ActivityView } from '@application/types';

import { FORMAT } from '@constants';

interface ActivityDay {
  activityDay: string;
}

export const fetchChronography = async (dayStart?: string, dayEnd?: string) => {
  const todayDay = dayjs().format(FORMAT.SQL_DAY);

  const [{ activityDay }] = await knex.raw<ActivityDay[]>(`
    select
        date(timings.start_at) as activityDay
    from
        main.timings
    order by timings.start_at desc
    limit 1
  `);

  const chronography = await knex.raw<ActivityView[]>(`
    select
        timings.id as timing_id,
        categories.id as category_id,
        categories.name as category_name,
        activities.id as activity_id,
        activities.name as activity_name,
        timings.start_at as start_at,
        timings.end_at as end_at,
        timings.description as description
    from
        main.timings
    left join main.activities on timings.activity_id = activities.id
    left join main.categories on activities.category_id = categories.id
    where date(timings.start_at) between ? and ?
    order by timings.start_at asc;
  `, [dayStart || activityDay || todayDay, dayEnd || activityDay || todayDay]);

  const timing = await fetchActiveTiming();

  return { chronography, timing };
};
