import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FocusStyleManager, Card, FormGroup, ButtonGroup, Divider, Button } from '@blueprintjs/core';

import { fetchChronography, fetchActiveTiming, stopTiming, openActivityAppendWindow } from '@frontend/controller';

import { Chronography } from '@frontend/components/chronography';
import { groupActivities } from '@frontend/utils';

import { ActivityGroup } from '@frontend/types';
import { ActivityView } from '@application/types';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const container = document.getElementById('root');
const root = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const ChronographyView = () => {
  const [activities, setActivities] = useState<ActivityGroup[]>([]);
  const [activeTiming, setActiveTiming] = useState<ActivityView>();

  const getChronography = async () => {
    const activityGroups = groupActivities(await fetchChronography());
    const [timing] = await fetchActiveTiming();

    setActiveTiming(timing);
    setActivities(activityGroups);
  };

  useEffect(() => {
    getChronography().catch(console.error);
  }, []);

  const createActivityAppendWindow = async () => {
    await openActivityAppendWindow();
    await getChronography();
  };

  const stopActiveTiming = async () => {
    await stopTiming();
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

          {!!activeTiming && (
            <>
              <Divider/>

              <Button
                large={true}
                icon='stop'
                intent='danger'
                title='Остановить'
                onClick={stopActiveTiming}
              />
            </>
          )}
        </ButtonGroup>
      </FormGroup>

      <Chronography groups={activities}/>
    </Card>
  );
};

root.render(<ChronographyView/>);
