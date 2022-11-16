import { app, BrowserWindow } from 'electron';

declare const CHRONOGRAPH_WEBPACK_ENTRY: string;
declare const CHRONOGRAPH_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: CHRONOGRAPH_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(CHRONOGRAPH_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
