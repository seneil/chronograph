import path from 'path';

import { BrowserWindow } from 'electron';
import type { BrowserWindowConstructorOptions } from 'electron';

import windowIcon from '@assets/favicons/png/128x128.png';

declare const CHRONOGRAPHY_WEBPACK_ENTRY: string;
declare const CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY: string;

const chronographyWindow: BrowserWindowConstructorOptions = {
  width: 710,
  height: 550,
  show: false,
  center: true,
  resizable: false,
  maximizable: false,
  autoHideMenuBar: true,
  backgroundColor: '#f6f5f4',
  icon: path.join(__dirname, windowIcon),
  webPreferences: {
    preload: CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY,
  },
};

export const getChronographyWindow = (): BrowserWindow => {
  const window: BrowserWindow = new BrowserWindow(chronographyWindow);

  window.loadURL(CHRONOGRAPHY_WEBPACK_ENTRY);

  return window;
};
