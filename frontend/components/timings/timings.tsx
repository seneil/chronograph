import { Activity } from '@frontend/components/activity';
import { Activity__Time } from '@frontend/components/activity/__time';
import { Activity__Description } from '@frontend/components/activity/__description';
import { Activity__Duration } from '@frontend/components/activity/__duration';

import { Timings__Date } from './__date';
import { Timings__Activities } from './__activities';

import { ActivityGroupView } from '@application/types/views/activity';

interface TimingsProps {
  date: string;
  activities: ActivityGroupView[];
}

export const Timings = ({ date, activities }: TimingsProps) => (
  <div className='timings'>
    <Timings__Date date={date}/>
    <Timings__Activities>
      {activities.map(timing => (
        <Activity key={timing.timing_id}>
          <Activity__Time timeStart={timing.start_time_at} timeEnd={timing.end_time_at}/>
          <Activity__Description
            category={timing.category_name}
            activity={timing.activity_name}
            description={timing.description}
          />
          <Activity__Duration minutes={timing.duration}/>
        </Activity>
      ))}
    </Timings__Activities>
  </div>
);
