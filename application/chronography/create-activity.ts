import { ActivityInput } from '@application/types';
import { parseTimeString } from '@application/chronography/utils/parse-time-string';

export const getActivity = (friendlyString: string): ActivityInput => {
  const result: ActivityInput = {
    activity: friendlyString,
    category: null,
    endTime: null,
    startTime: null,
  };

  const parts: string[] = friendlyString.split(' ');
  const [timeString]: string[] = parts;

  const timeStringRegexp = /^[1-9|\-|:].*$/ig;

  if (timeStringRegexp.test(timeString)) {
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
