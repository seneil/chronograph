import React, { useEffect, useState } from 'react';

import { Timings } from '@frontend/components/timings';
import { Chronography__Day } from './__day';

import { fetchChronography } from '@frontend/controller';
import { groupActivities } from '@frontend/utils';

export const Chronography = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getChronography = async () => {
      const activityGroups = groupActivities(await fetchChronography());

      setActivities(activityGroups);
    };

    getChronography()
      .catch(console.error);
  }, []);

  return (
    <div className='chronography'>
      <Chronography__Day>
        {activities.map(activity => (
          <Timings key={activity.date} {...activity}/>
        ))}
      </Chronography__Day>
    </div>
  );
};
