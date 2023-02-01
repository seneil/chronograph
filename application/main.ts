import 'dayjs/locale/ru';
import { app, BrowserWindow } from 'electron';

import { bootstrap } from '@application/bootstrap';
import { createChronography, createChronographyWindow } from '@application/routes';

app.disableHardwareAcceleration();

if (require('electron-squirrel-startup')) {
  app.quit();
}

const initializeApplication = (): void => {
  createChronography();
}

app.on('ready', async (): Promise<void> => {
  await bootstrap();

  initializeApplication()
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createChronographyWindow();
  }
});

app.on('window-all-closed', (event: Event) => {
  event.preventDefault();
});
