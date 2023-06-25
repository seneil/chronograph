import path from 'path';
import { nativeImage, Tray, screen } from 'electron';
import { menubar, Menubar } from 'menubar';

import { menuBarWindowConstructorOptions } from '@application/views/menubar';

import defaultTrayIcon from '@assets/favicons/default/icons/png/32x32.png';
import activeTrayIcon from '@assets/favicons/active/icons/png/32x32.png';

declare const MENUBAR_WEBPACK_ENTRY: string;

interface SystemTray {
  tray: Tray;
  trayMenuBar: Menubar;
}

const defaultIcon = nativeImage.createFromPath(path.join(__dirname, defaultTrayIcon as string));
const activeIcon = nativeImage.createFromPath(path.join(__dirname, activeTrayIcon as string));

export const setTrayIcon = (tray: Tray, status: boolean) => {
  tray.setImage(status ? activeIcon : defaultIcon);
};

export const createSystemTray = (): SystemTray => {
  const tray = new Tray(defaultIcon);

  const trayMenuBar = menubar({
    tray,
    preloadWindow: true,
    index: MENUBAR_WEBPACK_ENTRY,
    browserWindow: menuBarWindowConstructorOptions,
    windowPosition: 'center',
  });

  trayMenuBar.on('show', () => {
    const { x: pointerXPosition } = screen.getCursorScreenPoint();

    trayMenuBar.setOption('browserWindow', {
      ...menuBarWindowConstructorOptions,
      y: 30,
      x: pointerXPosition - (menuBarWindowConstructorOptions.width / 1.5),
    });
  });

  return { tray, trayMenuBar };
};
