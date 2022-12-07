import { BrowserWindow, ipcMain } from 'electron';

import { getAppendActivityWindow } from './views/append-activity';
import { getChronographyWindow } from './views/chronography';

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

ipcMain.handle('create-activity-append-window', () => {
  createAppendActivityWindow();
});
