import React from 'react';

import { Timings } from '@frontend/components/timings';
import { Chronography__Day } from '@frontend/components/chronography';

import { ActivityGroup } from '@frontend/types';

interface ChronographyProps {
  groups: ActivityGroup[],
}

export const Chronography = ({ groups }: ChronographyProps) => {

  return (
    <div className='chronography'>
      <Chronography__Day>
        {groups.map(activity => (
          <Timings key={activity.date} {...activity}/>
        ))}
      </Chronography__Day>
    </div>
  );
};
