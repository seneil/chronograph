import { BrowserWindow, ipcMain } from 'electron';

import { createSystemTray } from '@application/tray';
import { getAppendActivityWindow } from '@application/views/append-activity';
import { getChronographyWindow } from '@application/views/chronography';

import { repeatTiming, stopTiming, deleteTiming } from '@application/chronography/controllers/timings';
import { fetchChronography, fetchActivityData, postActivityInput } from '@application/chronography/controllers';

import { showPromptBox } from '@application/utils/show-prompt-box';

import { ActivityData } from '@application/types';
import { DayRange } from '@frontend/types';

import { EVENT_NAME } from '@constants';

let appendActivityWindow: BrowserWindow | null = null;
let chronographyWindow: BrowserWindow | null = null;

export const createAppendActivityWindow = (): Promise<void> => new Promise(resolve => {
  const window = getAppendActivityWindow(BrowserWindow.getFocusedWindow());

  appendActivityWindow = window;

  window.once('ready-to-show', () => {
    window.show();
  });

  window.once('closed', () => {
    appendActivityWindow = null;

    window.destroy();
    resolve();
  });
});

export const createChronographyWindow = (): void => {
  const window = getChronographyWindow();

  chronographyWindow = window;

  window.once('ready-to-show', () => {
    window.show();
  });

  window.once('closed', () => {
    chronographyWindow = null;

    window.destroy();
  });
};

export const createChronography = (): void => {
  const { trayMenuBar } = createSystemTray();

  trayMenuBar.on('ready', () => {
    createChronographyWindow();
  });
};

ipcMain.handle(EVENT_NAME.SERVICE.OPEN_ACTIVITY_APPEND_WINDOW, async () => {
  if (!appendActivityWindow) await createAppendActivityWindow();
});

ipcMain.handle(EVENT_NAME.SERVICE.CLOSE_ACTIVITY_APPEND_WINDOW, () => {
  if (appendActivityWindow) appendActivityWindow.close();
});

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_CHRONOGRAPHY, async (event, dayRange: DayRange) => (
  await fetchChronography(dayRange)
));

ipcMain.handle(EVENT_NAME.FETCHER.STOP_TIMING, async () => (
  await stopTiming()
));

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_ACTIVITY_DATA, (event, activityInput: string) => (
  fetchActivityData(activityInput)
));

ipcMain.handle(EVENT_NAME.FETCHER.POST_ACTIVITY_INPUT, async (event, activityData: ActivityData) => {
  await postActivityInput(activityData);

  appendActivityWindow.close();
});

ipcMain.handle(EVENT_NAME.FETCHER.REPEAT_TIMING, async (event, timingId: number) => (
  await repeatTiming(timingId)
));

ipcMain.handle(EVENT_NAME.FETCHER.DELETE_TIMING, async (event, timingId: number, details: string) => {
  const promptResult = await showPromptBox('Вы действительно хотите удалить тайминг?', details);

  if (promptResult) await deleteTiming(timingId);
});
