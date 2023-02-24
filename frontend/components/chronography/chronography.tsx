import React from 'react';

import { Timings } from '@frontend/components/timings';
import { Chronography__Day } from '@frontend/components/chronography';

import { ActivityCalendar } from '@frontend/types';

interface ChronographyProps {
  groups: ActivityCalendar[],
  onTimingRepeat: (id: number) => Promise<void>;
  onTimingDelete: (id: number, details: string) => Promise<void>;
}

export const Chronography = ({ groups, onTimingRepeat, onTimingDelete }: ChronographyProps) => (
  <div className='chronography'>
    <Chronography__Day>
      {groups.map(activity => (
        <Timings
          key={activity.date}
          {...activity}
          onRepeat={onTimingRepeat}
          onDelete={onTimingDelete}
        />
      ))}
    </Chronography__Day>
  </div>
);
