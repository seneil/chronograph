import dayjs from 'dayjs';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useMount } from 'react-use';

import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FocusStyleManager, Card, FormGroup, ButtonGroup, Divider, Button } from '@blueprintjs/core';

import { calendarizeActivities } from '@frontend/utils';

import { openActivityAppendWindow } from '@frontend/controller/services';
import { fetchChronography, repeatTiming, stopTiming, deleteTiming } from '@frontend/controller/chronography';

import { Chronography } from '@frontend/components/chronography';
import { TimingInfo } from '@frontend/components/timing-info';
import { ActivitiesCalendar } from '@frontend/components/activities-calendar';

import { ActivityCalendar } from '@frontend/types';
import { CurrentActivityView } from '@application/types';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const container = document.getElementById('root');
const view = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const ChronographyView = () => {
  const [activities, setActivities] = useState<ActivityCalendar[]>([]);
  const [timingInfo, setTimingInfo] = useState<CurrentActivityView>();

  const [previousDay, setPreviousDay] = useState<string>();
  const [nextDay, setNextDay] = useState<string>();

  const getChronography = async (day?: string) => {
    const { chronography, timing, previousActivityDay, nextActivityDay } = await fetchChronography(day, day);
    const activityCalendar = calendarizeActivities(chronography);

    setTimingInfo(timing);
    setActivities(activityCalendar);
    setPreviousDay(previousActivityDay);
    setNextDay(nextActivityDay);
  };

  useMount(() => {
    getChronography().catch(console.error);
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
    <Card>
      <FormGroup>
        <ButtonGroup>
          <Button
            large={true}
            icon='plus'
            intent='none'
            onClick={createActivityAppendWindow}
          >Активность</Button>

          <Divider/>

          <ActivitiesCalendar
            previousDay={previousDay}
            nextDay={nextDay}
            onGetChronography={getChronography}
          />

          {!!timingInfo && (
            <>
              <Divider/>

              <Button
                large={true}
                icon='stop'
                intent='danger'
                title='Остановить'
                onClick={stopActiveTiming}
              />

              <Divider/>

              <TimingInfo timing={timingInfo}/>
            </>
          )}
        </ButtonGroup>
      </FormGroup>

      <Chronography
        groups={activities}
        onTimingRepeat={repeatSelectedTiming}
        onTimingDelete={deleteSelectedTiming}
      />
    </Card>
  );
};

view.render(<ChronographyView/>);
