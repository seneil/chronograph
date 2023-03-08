import React, { useState } from 'react';
import { useMount } from 'react-use';
import { createRoot } from 'react-dom/client';

import { Button, FocusStyleManager } from '@blueprintjs/core';

import { MenuBar } from '@frontend/components/menu-bar';
import { TimingInfo } from '@frontend/components/timing-info';
import { ButtonsGroup } from '@frontend/components/buttons-group';

import { fetchActiveTiming, subscribeTimerRefreshEvent } from '@frontend/controller/chronography';
import { openChronographyWindow, quitApplication } from '@frontend/controller/services';

import { CurrentActivityView } from '@application/types';

const container = document.getElementById('root');
const view = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const MenuBarView = () => {
  const [timingInfo, setTimingInfo] = useState<CurrentActivityView>();

  const getActiveTiming = async () => {
    const timing = await fetchActiveTiming();

    setTimingInfo(timing);
  };

  useMount(async () => {
    try {
      await getActiveTiming();

      subscribeTimerRefreshEvent(async () => {
        await getActiveTiming();
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <MenuBar>
      {!!timingInfo && (
        <>
          <TimingInfo
            mods={{ widget: true }}
            timing={timingInfo}
          />
        </>
      )}

      <ButtonsGroup mods={{ vertical: true }}>
        <Button
          alignText="left"
          fill={true}
          minimal={true}
          title="Хронография"
          onClick={openChronographyWindow}
        >Хронография</Button>

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
