import { ActivityCalendarView } from '@application/types/views/activity';

export { ElectronGlobalService, ElectronGlobalFetcher } from './globals';

export interface ActivityCalendar {
  date: string;
  total: number;
  activities: ActivityCalendarView[];
}
