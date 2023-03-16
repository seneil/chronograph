import dayjs from 'dayjs';
import b from 'bem-react-helper';
import React, { useState } from 'react';
import { useInterval } from 'react-use';

import { convertMinutesToTime } from '@frontend/utils';

import { CurrentActivityView } from '@application/types';

interface TimingInfoMods {
  widget: boolean;
}

interface TimingInfoProps {
  timing: CurrentActivityView;
  stopButton: React.ReactNode;
  mods?: TimingInfoMods;
}

const UPDATE_INTERVAL = 25000;

const getDiffNow = (startAt: Date) => dayjs().diff(dayjs(startAt), 'minute');

export const TimingInfo = ({ timing, stopButton, mods }: TimingInfoProps) => {
  const [timingDuration, setTimingDuration] = useState(getDiffNow(timing.start_at));

  useInterval(() => {
    setTimingDuration(getDiffNow(timing.start_at));
  }, UPDATE_INTERVAL);

  return (
    <div className={b('timing-info', {}, { ...mods })}>
      <div className="timing-info__control">{stopButton}</div>

      <div className="timing-info__details">
        <div className="timing-info__row">
          <b>{convertMinutesToTime(timingDuration) || '0м'}</b>, за
          день {convertMinutesToTime(timing.duration + timingDuration)}
        </div>
        <div className="timing-info__row"><b>{timing.activity_name}</b> в категории {timing.category_name}</div>
      </div>
    </div>
  );
};
