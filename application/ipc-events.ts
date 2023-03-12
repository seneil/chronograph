import { BrowserWindow } from 'electron';

import { API_ENTRY, EVENT_NAME } from '@constants';

const sendDestinationsMessage = (destinations: BrowserWindow[], event: string) => {
  destinations.forEach(destination => (
    destination.webContents.send(event)
  ));
}

export const sendRefreshTimingMessage = (windows: BrowserWindow | BrowserWindow[]) => {
  const destinations = Array.isArray(windows) ? windows : [windows];

  sendDestinationsMessage(destinations, EVENT_NAME[API_ENTRY.LISTENER].REFRESH_ACTIVE_TIMING);
};

export const sendRefreshChronographyMessage = (windows: BrowserWindow | BrowserWindow[]) => {
  const destinations = Array.isArray(windows) ? windows : [windows];

  sendDestinationsMessage(destinations, EVENT_NAME[API_ENTRY.LISTENER].REFRESH_CHRONOGRAPHY);
};
