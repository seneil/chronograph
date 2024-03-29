import { app, BrowserWindow, Tray, ipcMain } from 'electron';

import { createSystemTray, setTrayIcon } from '@application/tray';
import { getAppendActivityWindow } from '@application/views/append-activity';
import { getChronographyWindow } from '@application/views/chronography';

import { fetchActiveTiming, repeatTiming, stopTiming, deleteTiming } from '@application/chronography/controllers/timings';
import { fetchChronography, fetchActivityData, postActivityInput } from '@application/chronography/controllers';

import { sendRefreshChronographyMessage, sendRefreshTimingMessage } from '@application/ipc-events';
import { showPromptBox } from '@application/utils/show-prompt-box';

import { ActivityData } from '@application/types';
import { DayRange } from '@frontend/types';

import { FETCHER_EVENT, SERVICE_EVENT } from '@constants';

let appendActivityWindow: BrowserWindow | null = null;
let chronographyWindow: BrowserWindow | null = null;
let menuBarWindow: BrowserWindow | null = null;
let trayIcon: Tray | null = null;

const refreshActiveTiming = () => {
  sendRefreshTimingMessage([
    ...menuBarWindow ? [menuBarWindow] : [],
    ...chronographyWindow ? [chronographyWindow] : [],
  ]);
};

const refreshChronographyTiming = () => {
  sendRefreshChronographyMessage([
    ...chronographyWindow ? [chronographyWindow] : [],
  ]);
};

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
  const { tray, trayMenuBar } = createSystemTray();

  trayMenuBar.on('ready', () => {
    menuBarWindow = trayMenuBar.window;
    trayIcon = tray;

    createChronographyWindow();
  });
};

ipcMain.handle(SERVICE_EVENT.OPEN_CHRONOGRAPHY_WINDOW, () => {
  if (chronographyWindow) {
    chronographyWindow.show();
  } else {
    createChronographyWindow();
  }
});

ipcMain.handle(SERVICE_EVENT.OPEN_ACTIVITY_APPEND_WINDOW, async () => {
  if (!appendActivityWindow) await createAppendActivityWindow();
});

ipcMain.handle(SERVICE_EVENT.CLOSE_ACTIVITY_APPEND_WINDOW, () => {
  if (appendActivityWindow) appendActivityWindow.close();
});

ipcMain.handle(SERVICE_EVENT.REFRESH_MENU_BAR_WINDOW_ICON, (event, status: boolean) => {
  setTrayIcon(trayIcon, status);
});

ipcMain.handle(SERVICE_EVENT.QUIT_APPLICATION, () => (
  app.quit()
));

ipcMain.handle(FETCHER_EVENT.FETCH_CHRONOGRAPHY, async (event, dayRange: DayRange) => (
  await fetchChronography(dayRange)
));

ipcMain.handle(FETCHER_EVENT.FETCH_ACTIVE_TIMING, async () => (
  await fetchActiveTiming()
));

ipcMain.handle(FETCHER_EVENT.STOP_TIMING, async () => {
  await stopTiming();

  refreshActiveTiming();
  refreshChronographyTiming();
});

ipcMain.handle(FETCHER_EVENT.FETCH_ACTIVITY_DATA, (event, activityInput: string) => (
  fetchActivityData(activityInput)
));

ipcMain.handle(FETCHER_EVENT.POST_ACTIVITY_INPUT, async (event, activityData: ActivityData) => {
  await postActivityInput(activityData);

  refreshActiveTiming();
  refreshChronographyTiming();

  appendActivityWindow.close();
});

ipcMain.handle(FETCHER_EVENT.REPEAT_TIMING, async (event, timingId: number) => {
  await repeatTiming(timingId);

  refreshActiveTiming();
  refreshChronographyTiming();
});

ipcMain.handle(FETCHER_EVENT.DELETE_TIMING, async (event, timingId: number, details: string) => {
  const promptResult = await showPromptBox('Вы действительно хотите удалить тайминг?', details);

  if (promptResult) {
    await deleteTiming(timingId);

    refreshActiveTiming();
    refreshChronographyTiming();
  }
});
