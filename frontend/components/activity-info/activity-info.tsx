import dayjs from 'dayjs';

import { ActivityData } from '@application/types';

export const ActivityInfo = ({ activity, category, startTime, endTime }: ActivityData) => (
  <p><b>{activity}</b>{category &&
    ` в категории ${category}`} c <b>{dayjs(startTime).format('HH:mm')}</b>
    {endTime && ` по ${dayjs(endTime).format('HH:mm')}`}
  </p>
);
