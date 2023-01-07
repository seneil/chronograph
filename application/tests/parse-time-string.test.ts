import { parseTimeString } from '@application/chronography/utils/parse-time-string';

const toLocal = (now: Date) => now.toString();

describe('Проверка парсинга времени', () => {
  it('Отправка пустой строки должно вернуть null', () => {
    expect(parseTimeString('')).toBeNull();
  });

  it('Время 10:18 должно вернуть дату с установленным временем 10:18', () => {
    const now: Date = new Date();

    now.setHours(10);
    now.setMinutes(18);

    expect(toLocal(parseTimeString('10:18'))).toBe(toLocal(now));
  });

  it('Отрицательное значение должно вернуть время за вычетом количества переданных минут', () => {
    const now: Date = new Date();

    expect(toLocal(parseTimeString('-10'))).toBe(toLocal(
      new Date(now.getTime() - 10 * 1000 * 60)
    ));
  });

  it('Отрицательное значение больше часа должно вернуть время за вычетом количества переданных минут', () => {
    const now: Date = new Date();

    expect(toLocal(parseTimeString('-120'))).toBe(toLocal(
      new Date(now.getTime() - 120 * 1000 * 60)
    ));
  });
});
