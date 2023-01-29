import path from 'path';

import { nativeImage, Tray, Menu, MenuItem } from 'electron';

import trayIcon from '@assets/favicons/png/16x16.png';

import { TRAY_MENU } from '@constants';

export const createSystemTray = (): Menu => {
  const icon = nativeImage.createFromPath(path.join(__dirname, trayIcon));

  const trayMenu = Menu.buildFromTemplate([
    new MenuItem({ id: TRAY_MENU.CHRONOGRAPHY, label: 'Хронограф' }),
    new MenuItem({ type: 'separator' }),
    new MenuItem({ role: 'quit', label: 'Выход' }),
  ]);

  const tray = new Tray(icon);

  tray.setContextMenu(trayMenu);

  return trayMenu;
};
