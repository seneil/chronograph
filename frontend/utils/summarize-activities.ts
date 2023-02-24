import dayjs from 'dayjs';

import { ActivityView } from '@application/types';
import { ActivitySummary } from '@frontend/types';

export const summarizeActivities = (activities: ActivityView[]): ActivitySummary[] => (
  activities.reduce((summary: ActivitySummary[], { category_name, start_at, end_at }) => {
    const index = summary.findIndex(item => item.categoryName === category_name);
    const duration = end_at ? dayjs(end_at).diff(dayjs(start_at), 'minute') : null;

    if (index >= 0) {
      summary[index] = {
        categoryName: category_name,
        total: summary[index].total + duration,
      };

      return [...summary];
    }

    return [...summary, { categoryName: category_name, total: duration }];
  }, [])
);
