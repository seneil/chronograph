import path from 'path';
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export class Chronograph {
  private window!: BrowserWindow | null;

  private isLocal: boolean;

  constructor() {
    this.isLocal = true;

    app.commandLine.appendSwitch('ignore-certificate-errors');

    this.subscribeToAppEvents();
  }

  async mountMain() {
    await app.whenReady();

    this.createWindow();
  }

  createWindow() {
    const defaultOptions: BrowserWindowConstructorOptions = {
      width: 400,
      height: 640,
      resizable: false,
      maximizable: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(app.getAppPath(), 'preload.bundle.js'),
      },
    };

    this.window = new BrowserWindow(defaultOptions);

    this.window
      .loadURL('https://localhost:8080/')
      .catch(console.log);

    this.window.webContents.openDevTools({
      mode: 'detach',
    });

    this.window.on('closed', () => {
      this.window = null;
    });
  }

  subscribeToAppEvents() {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }
}
