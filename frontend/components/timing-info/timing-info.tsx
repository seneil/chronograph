import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import { convertMinutesToTime } from '@frontend/utils';

import { CurrentActivityView } from '@application/types';

interface TimingInfoProps {
  timing: CurrentActivityView;
}

const UPDATE_INTERVAL = 25000;

const getDiffNow = (startAt: Date) => dayjs().diff(dayjs(startAt), 'minute');

export const TimingInfo = ({ timing }: TimingInfoProps) => {
  const [timingDuration, setTimingDuration] = useState(getDiffNow(timing.start_at));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimingDuration(getDiffNow(timing.start_at));
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [timingDuration]);

  return (
    <div className="timing-info">
      <div className="timing-info__row">
        <b>{convertMinutesToTime(timingDuration) || '0м'}</b>, за день {convertMinutesToTime(timing.duration + timingDuration)}
      </div>
      <div className="timing-info__row"><b>{timing.activity_name}</b> в категории {timing.category_name}</div>
    </div>
  );
};
