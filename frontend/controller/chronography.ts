import { ActivityData } from '@application/types';

import { API_ENTRY } from '@constants';

export const fetchChronography = async () => (
  await window[API_ENTRY.FETCHER].fetchChronography()
);

export const fetchActivityData = async (activityInput: string) => (
  await window[API_ENTRY.FETCHER].fetchActivityData(activityInput)
);

export const fetchActivityInput = async (activityData: ActivityData) => (
  await window[API_ENTRY.FETCHER].fetchActivityInput(activityData)
);
