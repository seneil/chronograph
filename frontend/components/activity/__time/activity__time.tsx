interface ActivityTimeProps {
  timeStart: string;
  timeEnd: string;
}

export const Activity__Time = ({ timeStart, timeEnd }: ActivityTimeProps) => (
  <div className="activity__time">{[timeStart, timeEnd].join('-')}</div>
);
