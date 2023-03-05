import dayjs from 'dayjs';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useMount } from 'react-use';

import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FocusStyleManager, FormGroup, ButtonGroup, Divider, Button } from '@blueprintjs/core';

import { calendarizeActivities, summarizeActivities } from '@frontend/utils';

import { openActivityAppendWindow } from '@frontend/controller/services';

import {
  deleteTiming,
  fetchActiveTiming,
  fetchChronography,
  repeatTiming,
  stopTiming,
} from '@frontend/controller/chronography';

import { Main } from '@frontend/components/main';
import { ChronographyControls } from '@frontend/components/chronography-controls';
import { ActivitiesCalendar } from '@frontend/components/activities-calendar';
import { Chronography } from '@frontend/components/chronography';
import { ChronographySummary } from '@frontend/components/chronography-summary';
import { TimingInfo } from '@frontend/components/timing-info';

import { ActivityCalendar, ActivitySummary, DayRange } from '@frontend/types';
import { CurrentActivityView } from '@application/types';
import { DateRange } from '@blueprintjs/datetime';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const container = document.getElementById('root');
const view = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const ChronographyView = () => {
  const [activities, setActivities] = useState<ActivityCalendar[]>([]);
  const [timingInfo, setTimingInfo] = useState<CurrentActivityView>();
  const [summary, setSummary] = useState<ActivitySummary[]>([]);

  const [previousDay, setPreviousDay] = useState<string>();
  const [nextDay, setNextDay] = useState<string>();
  const [dayRangeValue, setDayRangeValue] = useState<DateRange>([null, null]);

  const getChronography = async (dayRange?: DayRange) => {
    const [startDay, endDay] = dayRange || [];

    if ((startDay && endDay) || !dayRange) {
      const {
        chronography,
        dayRange: calendarDayRange,
        previousActivityDay,
        nextActivityDay
      } = await fetchChronography(dayRange);

      const timing = await fetchActiveTiming();

      const activityCalendar = calendarizeActivities(chronography);
      const activitySummary = summarizeActivities(chronography);

      setTimingInfo(timing);
      setActivities(activityCalendar);
      setSummary(activitySummary);
      setPreviousDay(previousActivityDay);
      setNextDay(nextActivityDay);
      setDayRangeValue(calendarDayRange);

      return;
    }

    setDayRangeValue([
      startDay ? dayjs(startDay).toDate() : null,
      endDay ? dayjs(endDay).toDate() : null,
    ]);
  };

  useMount(async () => {
    try {
      await getChronography();
    } catch(error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  const createActivityAppendWindow = async () => {
    await openActivityAppendWindow();
    await getChronography();
  };

  const stopActiveTiming = async () => {
    await stopTiming();
    await getChronography();
  };

  const repeatSelectedTiming = async (id: number) => {
    setTimingInfo(null);

    await repeatTiming(id);
    await getChronography();
  };

  const deleteSelectedTiming = async (id: number, details: string) => {
    await deleteTiming(id, details);
    await getChronography();
  };

  return (
    <Main>
      <ChronographyControls>
        <FormGroup>
          <ButtonGroup>
            <Button
              large={true}
              icon="plus"
              intent="none"
              onClick={createActivityAppendWindow}
            >Активность</Button>

            <Divider/>

            <ActivitiesCalendar
              previousDay={previousDay}
              nextDay={nextDay}
              calendarValue={dayRangeValue}
              onGetChronography={getChronography}
            />

            {!!timingInfo && (
              <>
                <Divider/>

                <Button
                  large={true}
                  icon="stop"
                  intent="danger"
                  title="Остановить"
                  onClick={stopActiveTiming}
                />

                <Divider/>

                <TimingInfo timing={timingInfo}/>
              </>
            )}
          </ButtonGroup>
        </FormGroup>
      </ChronographyControls>

      <Chronography
        groups={activities}
        onTimingRepeat={repeatSelectedTiming}
        onTimingDelete={deleteSelectedTiming}
      />

      <ChronographySummary summary={summary}/>
    </Main>
  );
};

view.render(<ChronographyView/>);
