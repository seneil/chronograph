import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

import type { DateRangeShortcut } from '@blueprintjs/datetime/src/shortcuts';

export const getCalendarShortcuts = (): DateRangeShortcut[] => [
  {
    label: 'Сегодня',
    includeTime: false,
    dateRange: [
      dayjs().toDate(),
      dayjs().toDate(),
    ],
  },
  {
    label: 'Вчера',
    includeTime: false,
    dateRange: [
      dayjs().subtract(1, 'day').toDate(),
      dayjs().subtract(1, 'day').toDate(),
    ],
  },
  {
    label: 'Неделя',
    includeTime: false,
    dateRange: [
      dayjs().weekday(0).toDate(),
      dayjs().toDate(),
    ],
  },
  {
    label: 'Прошлая неделя',
    includeTime: false,
    dateRange: [
      dayjs().subtract(1, 'week').weekday(0).toDate(),
      dayjs().subtract(1, 'week').weekday(6).toDate(),
    ],
  },
  {
    label: 'Месяц',
    includeTime: false,
    dateRange: [
      dayjs().set('date', 1).toDate(),
      dayjs().toDate(),
    ],
  },
  {
    label: 'Год',
    includeTime: false,
    dateRange: [
      dayjs().set('month', 0).set('date', 1).toDate(),
      dayjs().toDate(),
    ],
  },
];
