import React, { useState } from 'react';
import dayjs from 'dayjs';

import { Button } from '@blueprintjs/core';
import { Classes, Popover2 } from '@blueprintjs/popover2';
import { DateRangePicker, DateRange } from '@blueprintjs/datetime';

import { getCalendarLocaleUtils } from '@frontend/utils/get-calendar-locale-utils';
import { getCalendarShortcuts } from '@frontend/utils/get-calendar-shortcuts';

import type { LocaleUtils } from 'react-day-picker';
import { DayRange } from '@frontend/types';

import { FORMAT } from '@constants';

interface ActivitiesCalendarProps {
  previousDay: string;
  nextDay: string;
  calendarValue: DateRange;
  onGetChronography: (dayRange: DayRange) => Promise<void>
}

export const ActivitiesCalendar = ({ previousDay, nextDay, calendarValue, onGetChronography }: ActivitiesCalendarProps) => {
  const [isCalendarOpen, toggleCalendar] = useState<boolean>(false);

  const fetchPreviousDay = async () => (
    await onGetChronography([previousDay, previousDay])
  );

  const fetchNextDay = async () => (
    await onGetChronography([nextDay, nextDay])
  );

  const interactCalendar = (openState: boolean) => {
    toggleCalendar(openState);
  };

  const setDayRange = async (dayRange: DateRange) => {
    const [startDay, endDay] = dayRange;

    await onGetChronography([
      startDay ? dayjs(startDay).format(FORMAT.SQL_DAY) : null,
      endDay ? dayjs(endDay).format(FORMAT.SQL_DAY) : null,
    ]);

    if (startDay && endDay) toggleCalendar(false);
  }

  return (
    <div className='activities-calendar'>
      <Button
        large={true}
        icon='caret-left'
        intent='none'
        disabled={!previousDay}
        title='Предыдущий день'
        onClick={fetchPreviousDay}
      />

      <Popover2
        isOpen={isCalendarOpen}
        placement='bottom-end'
        popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
        positioningStrategy='fixed'
        onInteraction={interactCalendar}
        content={
          <DateRangePicker
            highlightCurrentDay={true}
            singleMonthOnly={true}
            allowSingleDayRange={true}
            localeUtils={getCalendarLocaleUtils() as LocaleUtils}
            shortcuts={getCalendarShortcuts()}
            value={calendarValue}
            onChange={setDayRange}
          />
        }
        renderTarget={({ ref, ...targetProps }) => (
          <Button
            {...targetProps}
            elementRef={ref}
            large={true}
            icon='calendar'
            intent='none'
            title='Календарь'
          />
        )}
      />

      <Button
        large={true}
        icon='caret-right'
        intent='none'
        disabled={!nextDay}
        title='Следующий день'
        onClick={fetchNextDay}
      />
    </div>
  );
};
