export const convertMinutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = h ? minutes - h * 60 : minutes;

  return `${[...h ? [`${h}h`] : [], ...m ? [`${m}m`] : []].join(' ')}`;
};
