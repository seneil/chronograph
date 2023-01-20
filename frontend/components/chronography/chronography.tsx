import React from 'react';

import { Timings } from '@frontend/components/timings';
import { Chronography__Day } from '@frontend/components/chronography';

import { ActivityCalendar } from '@frontend/types';

interface ChronographyProps {
  groups: ActivityCalendar[],
  onTimingRepeat: (id: number) => Promise<void>;
}

export const Chronography = ({ groups, onTimingRepeat }: ChronographyProps) => {

  return (
    <div className='chronography'>
      <Chronography__Day>
        {groups.map(activity => (
          <Timings
            key={activity.date}
            {...activity}
            onRepeat={onTimingRepeat}
          />
        ))}
      </Chronography__Day>
    </div>
  );
};
