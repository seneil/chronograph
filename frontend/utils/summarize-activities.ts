import dayjs from 'dayjs';

import { ActivityView } from '@application/types';
import { ActivitiesSummary } from '@frontend/types';

export const summarizeActivities = (activities: ActivityView[]): ActivitiesSummary => (
  activities.reduce((summary: ActivitiesSummary, { category_name, activity_name, start_at, end_at }) => {
    const categoryIndex = summary.categorySummary.findIndex(item => item.categoryName === category_name);
    const activityIndex = summary.activitySummary.findIndex(item => item.activityName === activity_name);
    const duration = end_at ? dayjs(end_at).diff(dayjs(start_at), 'minute') : null;

    if (categoryIndex >= 0) {
      summary.categorySummary[categoryIndex] = {
        categoryName: category_name,
        categoryTotal: summary.categorySummary[categoryIndex].categoryTotal + duration,
      };
    }

    if (activityIndex >= 0) {
      summary.activitySummary[activityIndex] = {
        activityName: activity_name,
        activityTotal: summary.activitySummary[activityIndex].activityTotal + duration,
      };
    }

    return {
      categorySummary: [
        ...summary.categorySummary,
        ...categoryIndex === -1 ? [{ categoryName: category_name, categoryTotal: duration }] : [],
      ],
      activitySummary: [
        ...summary.activitySummary,
        ...activityIndex === -1 ? [{ activityName: activity_name, activityTotal: duration }] : [],
      ],
    }
  }, { categorySummary: [], activitySummary: [] })
);
