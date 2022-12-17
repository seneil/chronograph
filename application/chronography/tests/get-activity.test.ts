import { getActivity } from '../create-activity';

describe('Проверка парсинга строки активности', () => {
  it('Должна быть записана активность в поле `activity`', () => {
    expect(getActivity('CHRN-17'))
      .toHaveProperty('activity', 'CHRN-17');

    expect(getActivity('10:00 CHRN-17'))
      .toHaveProperty('activity', 'CHRN-17');

    expect(getActivity('11:15-12:30 CHRN-17'))
      .toHaveProperty('activity', 'CHRN-17');

    expect(getActivity('-30 CHRN-17'))
      .toHaveProperty('activity', 'CHRN-17');

    expect(getActivity('Написание тестов'))
      .toHaveProperty('activity', 'Написание тестов');

    expect(getActivity('10:00 Написание тестов'))
      .toHaveProperty('activity', 'Написание тестов');

    expect(getActivity('11:15-12:30 Написание тестов'))
      .toHaveProperty('activity', 'Написание тестов');

    expect(getActivity('-30 Написание тестов'))
      .toHaveProperty('activity', 'Написание тестов');
  });

  it('Должна быть записана активность в поле `category`', () => {
    expect(getActivity('CHRN-17@Work'))
      .toHaveProperty('category', 'Work');

    expect(getActivity('10:00 CHRN-17@Work'))
      .toHaveProperty('category', 'Work');

    expect(getActivity('11:15-12:30 CHRN-17@Work'))
      .toHaveProperty('category', 'Work');

    expect(getActivity('-30 CHRN-17@Work'))
      .toHaveProperty('category', 'Work');

    expect(getActivity('Написание тестов@Прекрасный проект'))
      .toHaveProperty('category', 'Прекрасный проект');

    expect(getActivity('10:00 Написание тестов@Прекрасный проект'))
      .toHaveProperty('category', 'Прекрасный проект');

    expect(getActivity('11:15-12:30 Написание тестов@Прекрасный проект'))
      .toHaveProperty('category', 'Прекрасный проект');

    expect(getActivity('-30 Написание тестов@Прекрасный проект'))
      .toHaveProperty('category', 'Прекрасный проект');
  });

  it('Должна быть записана активность в поле `activity` и `category`', () => {
    expect(getActivity('Написание тестов@Прекрасный проект'))
      .toHaveProperty('activity', 'Написание тестов');

    expect(getActivity('Написание тестов@Прекрасный проект'))
      .toHaveProperty('category', 'Прекрасный проект');
  });

  it('Должно быть записано текущее время в поле `startTime`', () => {
    const now: Date = new Date();

    expect(getActivity('CHRN-17'))
      .toHaveProperty('startTime', now);
  });

  it('Должно быть записано время 10:00 в поле `startTime`', () => {
    const now: Date = new Date();

    now.setHours(10);
    now.setMinutes(0);

    expect(getActivity('10:00 CHRN-17'))
      .toHaveProperty('startTime', now);
  });

  it('Должно быть записано время 11:30 в поле `startTime`', () => {
    const now: Date = new Date();

    now.setHours(11);
    now.setMinutes(30);

    expect(getActivity('11:30-12:45 CHRN-17'))
      .toHaveProperty('startTime', now);
  });

  it('Должно быть записано время на 25 минут ранее текущего в поле `startTime`', () => {
    const now: Date = new Date();

    now.setMinutes(now.getMinutes() - 25);

    expect(getActivity('-25 CHRN-17'))
      .toHaveProperty('startTime', now);
  });

  it('Должно быть записано время на 120 минут ранее текущего в поле `startTime`', () => {
    const now: Date = new Date();

    now.setMinutes(now.getMinutes() - 120);

    expect(getActivity('-120 CHRN-17'))
      .toHaveProperty('startTime', now);
  });

  it('Должно быть записано null в поле `endTime`', () => {
    expect(getActivity('CHRN-17').endTime)
      .toBeNull();

    expect(getActivity('10:00 CHRN-17').endTime)
      .toBeNull();

    expect(getActivity('-30 CHRN-17').endTime)
      .toBeNull();
  });

  it('Должно быть записано время окончания в поле `endTime`', () => {
    const end: Date = new Date();

    end.setHours(12);
    end.setMinutes(45);

    expect(getActivity('11:30-12:45 CHRN-17'))
      .toHaveProperty('endTime', end);
  });
});
