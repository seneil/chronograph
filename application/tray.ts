import path from 'path';
import { app, nativeImage, Tray, screen } from 'electron';
import { menubar, Menubar } from 'menubar';

import { menuBarWindowConstructorOptions } from '@application/views/menubar';

import trayIcon from '@assets/favicons/png/16x16.png';

declare const MENUBAR_WEBPACK_ENTRY: string;

interface SystemTray {
  tray: Tray;
  trayMenuBar: Menubar;
}

export const createSystemTray = (): SystemTray => {
  const icon = nativeImage.createFromPath(path.join(__dirname, trayIcon as string));

  const tray = new Tray(icon);

  const trayMenuBar = menubar({
    tray,
    preloadWindow: true,
    index: MENUBAR_WEBPACK_ENTRY,
    browserWindow: menuBarWindowConstructorOptions,
    windowPosition: 'center',
  });

  trayMenuBar.on('show', () => {
    const isUnity = app.isUnityRunning();
    const { x: pointerXPosition } = screen.getCursorScreenPoint();

    if (isUnity) {
      trayMenuBar.setOption('browserWindow', {
        ...menuBarWindowConstructorOptions,
        y: 35,
        x: pointerXPosition - (menuBarWindowConstructorOptions.width / 1.5),
      });
    }
  });

  return { tray, trayMenuBar };
};
