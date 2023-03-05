import { BrowserWindowConstructorOptions } from 'electron';

declare const CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY: string;

export const menuBarWindowConstructorOptions: BrowserWindowConstructorOptions = {
  width: 350,
  height: 150,
  autoHideMenuBar: true,
  backgroundColor: '#fff',
  closable: false,
  frame: false,
  maximizable: false,
  minimizable: false,
  movable: false,
  resizable: false,
  show: false,
  title: 'Текущая активность',
  titleBarStyle: 'hidden',
  webPreferences: {
    preload: CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY,
  },
};
