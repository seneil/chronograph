import path from 'path';
import { app, BrowserWindow } from 'electron';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 640,
    resizable: false,
    maximizable: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), 'preload.bundle.js'),
    },
  });

  mainWindow.webContents.openDevTools({
    mode: 'detach',
  });

  mainWindow.loadURL('https://localhost:8080/');

  mainWindow.on('close', () => app.quit());
}

app.commandLine.appendSwitch('ignore-certificate-errors');

app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

console.log(`Electron Version ${app.getVersion()}`);
