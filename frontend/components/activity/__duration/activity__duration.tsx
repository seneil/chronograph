import { convertMinutesToTime } from '@frontend/utils';

interface ActivityDurationProps {
  minutes: number
}

export const Activity__Duration = ({ minutes }: ActivityDurationProps) => (
  <div className="activity__duration">{convertMinutesToTime(minutes)}</div>
);
