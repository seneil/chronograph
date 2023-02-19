import React from 'react';

import { Button } from '@blueprintjs/core';

interface ActivitiesCalendarProps {
  previousDay: string;
  nextDay: string;
  onGetChronography: (day: string) => Promise<void>
}

export const ActivitiesCalendar = ({ previousDay, nextDay, onGetChronography }: ActivitiesCalendarProps) => {
  const fetchPreviousDay = async () => (
    await onGetChronography(previousDay)
  );

  const fetchNextDay = async () => (
    await onGetChronography(nextDay)
  );

  return (
    <div className="activities-calendar">
      <Button
        large={true}
        icon='caret-left'
        intent='none'
        disabled={!previousDay}
        title="Предыдущий день"
        onClick={fetchPreviousDay}
      />

      <Button
        large={true}
        icon='calendar'
        intent='none'
        title="Календарь"
      ></Button>

      <Button
        large={true}
        icon='caret-right'
        intent='none'
        disabled={!nextDay}
        title="Следующий день"
        onClick={fetchNextDay}
      />
    </div>
  );
};
