import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

declare const APPEND_ACTIVITY_WEBPACK_ENTRY: string;
declare const CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY: string;

const appendActivityWindow: BrowserWindowConstructorOptions = {
  width: 510,
  height: 350,
  show: false,
  modal: true,
  center: true,
  resizable: false,
  maximizable: false,
  title: 'Новая активность',
  autoHideMenuBar: true,
  backgroundColor: '#f6f5f4',
  webPreferences: {
    preload: CHRONOGRAPHY_PRELOAD_WEBPACK_ENTRY,
  },
};

export const getAppendActivityWindow = (parentWindow: BrowserWindow): BrowserWindow => {
  const window: BrowserWindow = new BrowserWindow({
    ...appendActivityWindow,
    parent: parentWindow,
  });

  void window.loadURL(APPEND_ACTIVITY_WEBPACK_ENTRY);

  return window;
};
