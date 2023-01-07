import { knex } from '@application/connection';
import { TimingTable } from '@application/types';

export const completeActiveTiming = async (startTime: string) => (
  await knex<TimingTable>('timings')
    .where({ end_at: null })
    .update({ end_at: startTime })
);

export const insertTiming = async (activityId: number, startTime: string, endTime: string) => (
  await knex<TimingTable>('timings')
    .insert({ activity_id: activityId, start_at: startTime, end_at: endTime })
);
