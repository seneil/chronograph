import { ActivityCalendarView } from '@application/types/views/activity';

export { ElectronGlobalService, ElectronGlobalFetcher } from './globals';

export interface CategorySummary {
  categoryName: string;
  total: number;
}

export interface ActivityCalendar {
  date: string;
  total: number;
  summary: CategorySummary[];
  activities: ActivityCalendarView[];
}
