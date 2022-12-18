import { BrowserWindow, ipcMain } from 'electron';

import { getAppendActivityWindow } from '@application/views/append-activity';
import { getChronographyWindow } from '@application/views/chronography';

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

ipcMain.handle(EVENT_NAME.SERVICE.CREATE_ACTIVITY_APPEND_WINDOW, () => {
  createAppendActivityWindow();
});
