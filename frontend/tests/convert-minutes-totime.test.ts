import { convertMinutesToTime } from '@frontend/utils/convert-minutes-totime';

describe('Проверка конвертации минут в строку времени', () => {
  it('Должно быть возвращено 1h', () => {
    expect(convertMinutesToTime(60)).toBe('1h');
  });

  it('Должно быть возвращено 30m', () => {
    expect(convertMinutesToTime(30)).toBe('30m');
  });

  it('Должно быть возвращено 1h 30m', () => {
    expect(convertMinutesToTime(90)).toBe('1h 30m');
  });

  it('Должно быть возвращено 3h 45m', () => {
    expect(convertMinutesToTime(225)).toBe('3h 45m');
  });
});
