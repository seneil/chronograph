import { BrowserWindow, ipcMain } from 'electron';

import { getAppendActivityWindow } from '@application/views/append-activity';
import { getChronographyWindow } from '@application/views/chronography';

import { fetchChronography } from '@application/chronography/controllers/fetch-chronography';

import { EVENT_NAME } from '@constants';

export const createAppendActivityWindow = (): void => {
  const window = getAppendActivityWindow(BrowserWindow.getFocusedWindow());

  window.once('ready-to-show', () => {
    window.show();
  });
};

export const createChronographyWindow = (): void => {
  const window = getChronographyWindow();

  window.webContents.openDevTools();
};

ipcMain.handle(EVENT_NAME.SERVICE.OPEN_ACTIVITY_APPEND_WINDOW, () => {
  const childWindows = BrowserWindow.getFocusedWindow().getChildWindows();

  if (!childWindows.length) createAppendActivityWindow();
});

ipcMain.handle(EVENT_NAME.FETCHER.FETCH_CHRONOGRAPHY, async () => (
  fetchChronography()
));
