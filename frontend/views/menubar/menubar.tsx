import React, { useState } from 'react';
import { useMount } from 'react-use';
import { createRoot } from 'react-dom/client';

import { FocusStyleManager } from '@blueprintjs/core';

import { MenuBar } from '@frontend/components/menu-bar';
import { TimingInfo } from '@frontend/components/timing-info';

import { fetchActiveTiming, subscribeTimerEvent } from '@frontend/controller/chronography';

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

      subscribeTimerEvent(async () => {
        await getActiveTiming();
      });
    } catch(error) {
      console.error(error);
    }
  });

  return (
    <MenuBar>
      {!!timingInfo && (
        <>
          <TimingInfo timing={timingInfo}/>
        </>
      )}
    </MenuBar>
  );
}

view.render(<MenuBarView/>);
