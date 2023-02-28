import React from 'react';

import { convertMinutesToTime } from '@frontend/utils';

import { ActivitySummary } from '@frontend/types';

interface ChronographySummaryProps {
  summary: ActivitySummary[];
}

export const ChronographySummary = ({ summary }: ChronographySummaryProps) => (
  <div className="chronography-summary">
    {summary
      .reduce((categories, category, index) => (
        category.total
          ? `${index ? `${categories}, ` : ''}${category.categoryName}: ${convertMinutesToTime(category.total)}`
          : categories
      ), '')}
  </div>
);
