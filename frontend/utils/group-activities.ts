import dayjs from 'dayjs';

import { ActivityView } from '@application/types';
import { ActivityGroup } from '@frontend/types';

export const groupActivities = (activities: ActivityView[]): ActivityGroup[] => (
  activities.reduce((list, { start_at, end_at, ...item }) => {
    const dateKey = dayjs(start_at).format('YYYY-MM-DD');
    const activityIndex = list.findIndex(item => item.date === dateKey);

    const activity = {
      ...item,
      start_time_at: dayjs(start_at).format('HH:mm'),
      end_time_at: dayjs(end_at).format('HH:mm'),
      duration: dayjs(end_at).diff(dayjs(start_at), 'minute'),
    };

    if (activityIndex >= 0) {
      list[activityIndex] = {
        date: dateKey,
        total: list[activityIndex].minutes + activity.duration,
        activities: [...list[activityIndex].activities, activity]
      };

      return [...list];
    }

    return [...list, {
      date: dateKey,
      total: activity.duration,
      activities: [activity]
    }]
  }, [])
);
