import b from 'bem-react-helper';

interface ActivityTimeProps {
  timeStart: string;
  timeEnd: string | null;
  isCurrent: boolean;
}

export const Activity__Time = ({ timeStart, timeEnd, isCurrent }: ActivityTimeProps) => (
  <div className={b('activity__time', {}, { current: isCurrent })}>{timeEnd ? [timeStart, timeEnd].join('-') : timeStart}</div>
);
