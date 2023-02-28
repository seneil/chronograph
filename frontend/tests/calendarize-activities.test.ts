import { calendarizeActivities } from '@frontend/utils';

import { ActivityCalendar } from '@frontend/types';

import { activities } from './mocks/activities';

let calendar: ActivityCalendar[];
let day: ActivityCalendar;

describe('Группировка списка активностей по календарь по дням', () => {
  beforeEach(() => {
    calendar = calendarizeActivities(activities);
    day = calendar.find(item => item.date === '2022-12-25');
  });

  it('Должно быть сгруппировано по 4 дням', () => {
    expect(calendar.map(day => day.date).length).toBe(4);
  });

  it('Должны быть поля `date`, `total`, `activities`', () => {
    expect(Object.keys(day)).toEqual([
      'date',
      'total',
      'activities',
    ]);
  });

  it('Должны быть отсортированы даты от поздней к ранней', () => {
    expect(calendar.map(day => day.date)).toEqual([
      '2023-02-05',
      '2023-02-01',
      '2022-12-26',
      '2022-12-25',
    ]);
  });

  it('Должно быть общее количество 480 минут за день', () => {
    expect(day.total).toBe(480);
  });

  it('Должно быть 5 активностей за день', () => {
    expect(day.activities.length).toBe(5);
  });
});
