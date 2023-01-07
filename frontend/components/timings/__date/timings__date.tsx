interface TimingsDateProps {
  date: string;
}

export const Timings__Date = ({ date }: TimingsDateProps) => (
  <div className="timings__date">{date}</div>
);
