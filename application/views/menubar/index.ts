import { BrowserWindowConstructorOptions } from 'electron';

declare const CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY: string;

export const menuBarWindowConstructorOptions: BrowserWindowConstructorOptions = {
  autoHideMenuBar: true,
  backgroundColor: '#fff',
  closable: false,
  frame: false,
  hasShadow: false,
  height: 170,
  maximizable: false,
  minimizable: false,
  movable: false,
  resizable: false,
  roundedCorners: false,
  show: false,
  titleBarStyle: 'hidden',
  width: 350,
  webPreferences: {
    preload: CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY,
  },
};
