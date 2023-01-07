import {
  Activity,
  Activity__Time,
  Activity__Description,
  Activity__Duration,
} from '@frontend/components/activity';

import { Timings__Date, Timings__Activities } from '@frontend/components/timings';

import { ActivityGroupView } from '@application/types/views/activity';

interface TimingsProps {
  date: string;
  activities: ActivityGroupView[];
}

export const Timings = ({ date, activities }: TimingsProps) => (
  <div className='timings'>
    <Timings__Date date={date}/>
    <Timings__Activities>
      {activities.map(timing => {
        const isCurrentTiming = !timing.end_time_at;

        return (
          <Activity key={timing.timing_id}>
            <Activity__Time
              timeStart={timing.start_time_at}
              timeEnd={timing.end_time_at}
              isCurrent={isCurrentTiming}
            />

            <Activity__Description
              category={timing.category_name}
              activity={timing.activity_name}
              description={timing.description}
              isCurrent={isCurrentTiming}
            />

            <Activity__Duration minutes={timing.duration}/>
          </Activity>
        );
      })}
    </Timings__Activities>
  </div>
);
