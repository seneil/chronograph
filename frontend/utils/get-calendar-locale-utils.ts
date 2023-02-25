import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import { FORMAT } from '@constants';

dayjs.extend(localeData);
dayjs().localeData();

dayjs.locale('ru');

export const getCalendarLocaleUtils = () => ({
  formatDay: (date: Date, format?: string): string => (
    dayjs(date).format(format || FORMAT.SQL_DAY)
  ),
  formatMonthTitle: (month: Date): string => {
    const months = dayjs.months();

    return `${months[month.getMonth()]} ${month.getFullYear()}`;
  },
  formatWeekdayLong: (weekday: number): string => {
    const weekdays = dayjs.weekdays();

    return weekdays[weekday];
  },
  formatWeekdayShort: (weekday: number): string => {
    const weekdays = dayjs.weekdaysMin();

    return weekdays[weekday];
  },
  getFirstDayOfWeek: (): number => (
    1
  ),
  getMonths: (): [string, string, string, string, string, string, string, string, string, string, string, string] => (
    dayjs.months()
  ),
});
