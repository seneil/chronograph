import { ActivityCalendarView } from '@application/types/views/activity';

export { ElectronGlobalService, ElectronGlobalFetcher } from './globals';

export interface ActivityCalendar {
  date: string;
  total: number;
  activities: ActivityCalendarView[];
}

export type DayRange = [string | null, string | null];
