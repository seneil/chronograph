export const convertMinutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = h ? minutes - (h * 60) : minutes;

  return `${[...h ? [`${h}ч`] : [], ...m ? [`${m}м`] : []].join(' ')}`;
};
