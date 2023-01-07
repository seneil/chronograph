export { CategoryTable, ActivityTable, TimingTable } from './tables';
export { ActivityView } from './views';

export interface ActivityInput {
  activity: string;
  category: string | null;
  startTime: Date;
  endTime: Date | null;
}
