import { ActivityData } from '@application/types';
import { parseTimeString } from '@application/chronography/utils/parse-time-string';

export const getActivity = (friendlyString: string): ActivityData => {
  const result: ActivityData = {
    activity: friendlyString,
    category: null,
    endTime: null,
    startTime: null,
  };

  const parts: string[] = friendlyString.split(' ');
  const [timeString]: string[] = parts;

  const timeStringRelativeRegexp = /^-([0-9]+)/ig;
  const timeStringRegexp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ig;
  const timeStringRangeRegexp = /^(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])-(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/gi;

  if (timeStringRelativeRegexp.test(timeString) || timeStringRegexp.test(timeString) || timeStringRangeRegexp.test(timeString)) {
    const isTimeRange = timeString.indexOf('-') > 0;

    result.startTime = isTimeRange ? parseTimeString(timeString.substring(0, timeString.indexOf('-'))) : parseTimeString(timeString);
    result.endTime = isTimeRange ? parseTimeString(timeString.substring(timeString.indexOf('-') + 1)) : result.endTime;

    parts.shift();
  } else {
    result.startTime = new Date();
  }

  const [activity, category = result.category]: string[] = parts.join(' ').split('@');

  result.activity = activity;
  result.category = category;

  return result;
};
