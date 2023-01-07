import { BrowserWindow, ipcMain } from 'electron';

import { getAppendActivityWindow } from '@application/views/append-activity';
import { getChronographyWindow } from '@application/views/chronography';

import {
  fetchChronography,
  fetchActivityData,
  fetchActivityInput,
  fetchActiveTiming,
  stopTiming,
} from '@application/chronography/controllers';

import { EVENT_NAME } from '@constants';
import { ActivityData } from '@application/types';

let appendActivityWindow: BrowserWindow | null = null;

export const createAppendActivityWindow = (): Promise<void> => new Promise(resolve => {
  const window = getAppendActivityWindow(BrowserWindow.getFocusedWindow());

  appendActivityWindow = window;

  window.once('ready-to-show', () => {
    window.show();
  });

  window.once('closed', () => {
    appendActivityWindow = null;

    resolve();
  })
});

export const createChronographyWindow = (): void => {
  getChronographyWindow();
};

ipcMain.handle(EVENT_NAME.SERVICE.OPEN_ACTIVITY_APPEND_WINDOW, async () => {
  if (!appendActivityWindow) await createAppendActivityWindow();
});

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_CHRONOGRAPHY, async () => (
  fetchChronography()
));

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_ACTIVE_TIMING, async () => (
  fetchActiveTiming()
));

ipcMain.handle(EVENT_NAME.FETCHER.STOP_TIMING, async () => (
  stopTiming()
));

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_ACTIVITY_DATA, async (event, activityInput: string) => (
  fetchActivityData(activityInput)
));

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_ACTIVITY_INPUT, async (event, activityData: ActivityData) => {
  await fetchActivityInput(activityData);

  appendActivityWindow.close();
});
