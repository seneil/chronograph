import { convertMinutesToTime } from '@frontend/utils';

import { ActivitiesSummary } from '@frontend/types';

interface ChronographySummaryProps {
  summary: ActivitiesSummary;
}

export const ChronographySummary = ({ summary }: ChronographySummaryProps) => (
  <div className="chronography-summary">
    <p>
      {summary?.categorySummary
        .reduce((categories, category, index) => (
          category.categoryTotal
            ? `${index ? `${categories}, ` : ''}${category.categoryName}: ${convertMinutesToTime(category.categoryTotal)}`
            : categories
        ), '')}
    </p>
    <p>
      {summary?.activitySummary
        .reduce((activities, activity, index) => (
          activity.activityTotal
            ? `${index ? `${activities}, ` : ''}${activity.activityName}: ${convertMinutesToTime(activity.activityTotal)}`
            : activities
        ), '')}
    </p>
  </div>
);
