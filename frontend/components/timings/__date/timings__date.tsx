import dayjs from 'dayjs';

interface TimingsDateProps {
  date: string;
}

export const Timings__Date = ({ date }: TimingsDateProps) => (
  <div className="timings__date">{dayjs(date).format('DD MMM')}</div>
);
