import dayjs from 'dayjs';

import { ActivityView } from '@application/types';
import { ActivityCalendar, CategorySummary } from '@frontend/types';

export const calendarizeActivities = (activities: ActivityView[]): ActivityCalendar[] => (
  activities.reduce((list, { start_at, end_at, ...item }) => {
    const dateKey = dayjs(start_at).format('YYYY-MM-DD');
    const activityIndex = list.findIndex(item => item.date === dateKey);

    const activity = {
      ...item,
      start_time_at: dayjs(start_at).format('HH:mm'),
      end_time_at: end_at ? dayjs(end_at).format('HH:mm') : null,
      duration: end_at ? dayjs(end_at).diff(dayjs(start_at), 'minute') : null,
    };

    if (activityIndex >= 0) {
      list[activityIndex] = {
        date: dateKey,
        total: list[activityIndex].total + (activity.duration || 0),
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
    .map((day: ActivityCalendar) => ({
      ...day,
      summary: day.activities.reduce((summary: CategorySummary[], { category_name, duration }) => {
        const index = summary.findIndex(item => item.categoryName === category_name);

        if (index >= 0) {
          summary[index] = {
            categoryName: category_name,
            total: summary[index].total + duration,
          };

          return [...summary];
        }

        return [...summary, { categoryName: category_name, total: duration }];
      }, []),
    }))
    .sort((a, b) => (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0))
);
