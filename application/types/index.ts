export { CategoryTable, ActivityTable, TimingTable } from './tables';
export { ActivityView, activeTimingStart, CurrentActivityView } from './views';

export interface ActivityData {
  activity: string;
  category: string | null;
  startTime: Date;
  endTime: Date | null;
}

export interface ActivityDay {
  activityDay: string;
}
