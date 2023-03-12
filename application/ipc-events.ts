import { BrowserWindow } from 'electron';

import { LISTENER_EVENT } from '@constants';

type EventValues = typeof LISTENER_EVENT[keyof typeof LISTENER_EVENT];

const sendDestinationsMessage = (destinations: BrowserWindow[], event: EventValues) => {
  destinations.forEach(destination => (
    destination.webContents.send(event)
  ));
}

export const sendRefreshTimingMessage = (windows: BrowserWindow | BrowserWindow[]) => {
  const destinations = Array.isArray(windows) ? windows : [windows];

  sendDestinationsMessage(destinations, LISTENER_EVENT.REFRESH_ACTIVE_TIMING);
};

export const sendRefreshChronographyMessage = (windows: BrowserWindow | BrowserWindow[]) => {
  const destinations = Array.isArray(windows) ? windows : [windows];

  sendDestinationsMessage(destinations, LISTENER_EVENT.REFRESH_CHRONOGRAPHY);
};
