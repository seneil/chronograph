import dayjs from 'dayjs';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useMount } from 'react-use';

import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FocusStyleManager, Card, FormGroup, ButtonGroup, Divider, Button } from '@blueprintjs/core';

import { calendarizeActivities } from '@frontend/utils';

import {
  fetchChronography,
  fetchActiveTiming,
  stopTiming,
  repeatTiming,
  openActivityAppendWindow
} from '@frontend/controller';

import { Chronography } from '@frontend/components/chronography';
import { TimingInfo } from '@frontend/components/timing-info';

import { ActivityCalendar } from '@frontend/types';
import { CurrentActivityView } from '@application/types';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const container = document.getElementById('root');
const root = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const ChronographyView = () => {
  const [activities, setActivities] = useState<ActivityCalendar[]>([]);
  const [timingInfo, setTimingInfo] = useState<CurrentActivityView>();

  const getChronography = async () => {
    const activityCalendar = calendarizeActivities(await fetchChronography());
    const timing = await fetchActiveTiming();

    setTimingInfo(timing);
    setActivities(activityCalendar);
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
      />
    </Card>
  );
};

root.render(<ChronographyView/>);
