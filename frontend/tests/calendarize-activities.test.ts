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

  it('Должны быть поля `date`, `total`, `activities`, `summary`', () => {
    expect(Object.keys(day)).toEqual([
      'date',
      'total',
      'activities',
      'summary',
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

  it('Должно быть 3 учтённых категории за день', () => {
    expect(day.summary.length).toBe(3);
  });

  it('Должна быть категория `Chronograph` с 300 учтённых минут', () => {
    expect(day.summary).toContainEqual({ categoryName: 'Chronograph', total: 300 });
  });

  it('Должна быть категория `Досуг` с 60 учтённых минут', () => {
    expect(day.summary).toContainEqual({ categoryName: 'Досуг', total: 60 });
  });

  it('Должна быть категория `Образование` с 120 учтённых минут', () => {
    expect(day.summary).toContainEqual({ categoryName: 'Образование', total: 120 });
  });
});
