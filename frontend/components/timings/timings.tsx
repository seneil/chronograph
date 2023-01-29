import {
  Activity,
  Activity__Time,
  Activity__Description,
  Activity__Duration,
} from '@frontend/components/activity';

import { Timings__Date, Timings__Activities } from '@frontend/components/timings';
import { TimingControls } from '@frontend/components/timing-controls';

import { ActivityCalendarView } from '@application/types/views/activity';

interface TimingsProps {
  date: string;
  total: number;
  activities: ActivityCalendarView[];
  onRepeat: (id: number) => Promise<void>;
  onDelete: (id: number, details: string) => Promise<void>;
}

export const Timings = ({ date, total, activities, onRepeat, onDelete }: TimingsProps) => (
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

            {timing.end_time_at && (
              <TimingControls
                timing={timing}
                onRepeat={onRepeat}
                onDelete={onDelete}
              />
            )}
          </Activity>
        );
      })}

      <Activity key={`${date}-total`} isTotal>
        <Activity__Duration minutes={total}/>
      </Activity>
    </Timings__Activities>
  </div>
);
