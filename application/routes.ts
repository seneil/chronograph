import { BrowserWindow, ipcMain } from 'electron';

import { getAppendActivityWindow } from '@application/views/append-activity';
import { getChronographyWindow } from '@application/views/chronography';

import { fetchActiveTiming, repeatTiming, stopTiming, deleteTiming } from '@application/chronography/controllers/timings';
import { fetchChronography, fetchActivityData, postActivityInput } from '@application/chronography/controllers';

import { ActivityData } from '@application/types';

import { EVENT_NAME } from '@constants';
import { showPromptBox } from '@application/utils/show-prompt-box';

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
  const window = getChronographyWindow();

  window.once('ready-to-show', () => {
    window.show();
  });
};

ipcMain.handle(EVENT_NAME.SERVICE.OPEN_ACTIVITY_APPEND_WINDOW, async () => {
  if (!appendActivityWindow) await createAppendActivityWindow();
});

ipcMain.handle(EVENT_NAME.SERVICE.CLOSE_ACTIVITY_APPEND_WINDOW, async () => {
  if (appendActivityWindow) appendActivityWindow.close();
});

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_CHRONOGRAPHY, async () => (
  await fetchChronography()
));

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_ACTIVE_TIMING, async () => (
  await fetchActiveTiming()
));

ipcMain.handle(EVENT_NAME.FETCHER.STOP_TIMING, async () => (
  await stopTiming()
));

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_ACTIVITY_DATA, async (event, activityInput: string) => (
  await fetchActivityData(activityInput)
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
