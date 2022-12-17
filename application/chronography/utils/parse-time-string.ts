/**
 * Парсинг строки содержащей время или относительное число
 * '10:25' - будет возвращён объект Data где 10 часов и 25 минут
 *  '-25' - будет возвращён объект Data где время уменьшенно на указанное количество минут
 * @param timeString
 */
export const parseTimeString = (timeString: string): Date | null => {
  if (!timeString) return null;

  const now = new Date();

  if (timeString.charAt(0) === '-') {
    return new Date(now.getTime() + (parseInt(timeString, 10) * 1000 * 60));
  }

  const [hours, minutes]: string[] = timeString.split(':');

  now.setHours(parseInt(hours, 10));
  now.setMinutes(parseInt(minutes, 10) || 0);

  return now;
};
