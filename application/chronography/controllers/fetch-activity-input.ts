import {
  searchCategory,
  insertCategory,
  searchActivity,
  insertActivity,
  completeActiveTiming,
  insertTiming,
} from '@application/chronography/controllers';

import { ActivityData } from '@application/types';

export const fetchActivityInput = async (activityData: ActivityData): Promise<void> => {
  const { category: categoryName, activity: activityName, startTime, endTime } = activityData

  const startTimeString = new Date(startTime).toISOString();
  const endTimeString = endTime ? new Date(endTime).toISOString() : null;

  const [foundCategory] = await searchCategory(categoryName);
  const category = foundCategory || await insertCategory(categoryName);

  const [foundActivity] = await searchActivity(activityName, category.id);
  const activity = foundActivity || await insertActivity(activityName, category.id);

  if (!endTime) {
    await completeActiveTiming(startTimeString);
  }

  await insertTiming(activity.id, startTimeString, endTimeString);
};
