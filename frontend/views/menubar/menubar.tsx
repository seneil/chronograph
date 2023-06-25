import { useState } from 'react';
import { useMount } from 'react-use';
import { createRoot } from 'react-dom/client';

import { Button, Divider, FocusStyleManager } from '@blueprintjs/core';

import { MenuBar } from '@frontend/components/menu-bar';
import { TimingInfo } from '@frontend/components/timing-info';
import { ButtonsGroup } from '@frontend/components/buttons-group';
import { TimingEmpty } from '@frontend/components/timing-empty';

import { fetchActiveTiming, stopTiming, subscribeTimerRefreshEvent } from '@frontend/controller/chronography';
import {
  openActivityAppendWindow,
  openChronographyWindow,
  quitApplication,
  refreshMenuBarWindowIcon,
} from '@frontend/controller/services';

import { CurrentActivityView } from '@application/types';

const container = document.getElementById('root');
const view = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const MenuBarView = () => {
  const [timingInfo, setTimingInfo] = useState<CurrentActivityView>();

  useMount(async () => {
    try {
      await prepareActiveTiming();

      subscribeTimerRefreshEvent(async () => {
        await prepareActiveTiming();
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  const prepareActiveTiming = async () => {
    const timing = await getActiveTiming();

    refreshMenuBarWindowIcon(!!timing);
  };

  const getActiveTiming = async () => {
    const timing = await fetchActiveTiming();

    setTimingInfo(timing);

    return timing;
  };

  const createActivityAppendWindow = async () => {
    await openActivityAppendWindow();
  };

  const stopActiveTiming = async () => {
    await stopTiming();
    await openChronographyWindow();
  };

  return (
    <MenuBar>
      {!!timingInfo && (
        <TimingInfo
          mods={{ widget: true }}
          timing={timingInfo}
          stopButton={(
            <Button
              large={true}
              icon="stop"
              intent="danger"
              title="Остановить"
              onClick={stopActiveTiming}
            />
          )}
        />
      )}

      {!timingInfo && (
        <TimingEmpty>
          Нет активной задачи
        </TimingEmpty>
      )}

      <ButtonsGroup mods={{ vertical: true }}>
        <Button
          alignText="left"
          fill={true}
          minimal={true}
          icon="plus"
          title="Активность"
          onClick={createActivityAppendWindow}
        >Активность</Button>

        <Button
          alignText="left"
          fill={true}
          minimal={true}
          title="Хронография"
          onClick={openChronographyWindow}
        >Хронография</Button>

        <Divider/>

        <Button
          alignText="left"
          fill={true}
          minimal={true}
          title="Выход"
          onClick={quitApplication}
        >Выход</Button>
      </ButtonsGroup>
    </MenuBar>
  );
}

view.render(<MenuBarView/>);
