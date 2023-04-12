import { ActivityCalendarView } from '@application/types/views/activity';

export { ElectronGlobalService, ElectronGlobalFetcher } from './globals';

export interface ActivityCalendar {
  date: string;
  total: number;
  activities: ActivityCalendarView[];
}

export interface CategorySummary {
  categoryName: string;
  categoryTotal: number | null;
}

export interface ActivitySummary {
  activityName: string;
  activityTotal: number | null;
}

export interface ActivitiesSummary {
  categorySummary: CategorySummary[],
  activitySummary: ActivitySummary[],
}

export type DayRange = [string | null, string | null];
