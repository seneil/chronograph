import { convertMinutesToTime } from '@frontend/utils/convert-minutes-totime';

describe('Проверка конвертации минут в строку времени', () => {
  it('Должна быть возвращена пустая строка', () => {
    expect(convertMinutesToTime(0)).toBe('');
  });

  it('Должно быть возвращено 1ч', () => {
    expect(convertMinutesToTime(60)).toBe('1ч');
  });

  it('Должно быть возвращено 30м', () => {
    expect(convertMinutesToTime(30)).toBe('30м');
  });

  it('Должно быть возвращено 1ч 30м', () => {
    expect(convertMinutesToTime(90)).toBe('1ч 30м');
  });

  it('Должно быть возвращено 3ч 45м', () => {
    expect(convertMinutesToTime(225)).toBe('3ч 45м');
  });
});
