import { app, BrowserWindow } from 'electron';

import { createChronographyWindow } from '@application/routes';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const initializeApplication = (): void => {
  createChronographyWindow();
}

app.on('ready', initializeApplication);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    initializeApplication();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
