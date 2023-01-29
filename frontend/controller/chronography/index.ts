import { ActivityData } from '@application/types';

import { API_ENTRY } from '@constants';

export const closeActivityAppendWindow = () => (
  window[API_ENTRY.SERVICE].closeActivityAppendWindow()
);

export const fetchChronography = async () => (
  await window[API_ENTRY.FETCHER].fetchChronography()
);

export const fetchActiveTiming = async () => (
  await window[API_ENTRY.FETCHER].fetchActiveTiming()
);

export const stopTiming = async () => (
  await window[API_ENTRY.FETCHER].stopTiming()
);

export const fetchActivityData = async (activityInput: string) => (
  await window[API_ENTRY.FETCHER].fetchActivityData(activityInput)
);

export const postActivityInput = async (activityData: ActivityData) => (
  await window[API_ENTRY.FETCHER].postActivityInput(activityData)
);

export const repeatTiming = async (timingId: number) => (
  await window[API_ENTRY.FETCHER].repeatTiming(timingId)
);
