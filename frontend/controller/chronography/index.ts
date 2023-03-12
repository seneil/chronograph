import { ActivityData } from '@application/types';

import { DayRange } from '@frontend/types';

import { API_ENTRY } from '@constants';

export const closeActivityAppendWindow = () => (
  window[API_ENTRY.SERVICE].closeActivityAppendWindow()
);

export const fetchChronography = async (dayRange: DayRange) => (
  await window[API_ENTRY.FETCHER].fetchChronography(dayRange)
);

export const fetchActiveTiming = async () => (
  await window[API_ENTRY.FETCHER].fetchActiveTiming()
);

export const subscribeTimerRefreshEvent = (callback: () => void) => (
  window[API_ENTRY.LISTENER].subscribeTimerRefreshEvent(callback)
);

export const subscribeChronographyRefreshEvent = (callback: () => void) => (
  window[API_ENTRY.LISTENER].subscribeChronographyRefreshEvent(callback)
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

export const deleteTiming = async (timingId: number, details: string) => (
  await window[API_ENTRY.FETCHER].deleteTiming(timingId, details)
);
