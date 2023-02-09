import { convertMinutesToTime } from '@frontend/utils';

import { CategorySummary } from '@frontend/types';

interface ActivitiesSummaryProps {
  summary: CategorySummary[];
}

export const ActivitiesSummary = ({ summary }: ActivitiesSummaryProps) => (
  <div className="activities-summary">{
    summary
      .reduce((categories, category, index) => (
        category.total
          ? `${index ? `${categories}, ` : ''}${category.categoryName}: ${convertMinutesToTime(category.total)}`
          : categories
      ), '')
  }</div>
);
