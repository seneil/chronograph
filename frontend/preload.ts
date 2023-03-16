import { contextBridge, ipcRenderer } from 'electron';

import { DayRange, ElectronGlobalFetcher, ElectronGlobalService } from '@frontend/types';

import { API_ENTRY, FETCHER_EVENT, LISTENER_EVENT, SERVICE_EVENT } from '@constants';
import { ElectronGlobalListener } from '@frontend/types/globals';

contextBridge.exposeInMainWorld(API_ENTRY.SERVICE, <ElectronGlobalService>{
  getVersion: () => ['chrome', 'node', 'electron']
    .map(platform => `${platform}: ${process.versions[platform]}`)
    .join(', '),

  openChronographyWindow: () => ipcRenderer.invoke(SERVICE_EVENT.OPEN_CHRONOGRAPHY_WINDOW),
  openActivityAppendWindow: () => ipcRenderer.invoke(SERVICE_EVENT.OPEN_ACTIVITY_APPEND_WINDOW),
  closeActivityAppendWindow: () => ipcRenderer.invoke(SERVICE_EVENT.CLOSE_ACTIVITY_APPEND_WINDOW),
  quitApplication: () => ipcRenderer.invoke(SERVICE_EVENT.QUIT_APPLICATION),
});

contextBridge.exposeInMainWorld(API_ENTRY.LISTENER, <ElectronGlobalListener>{
  subscribeTimerRefreshEvent: callback => (
    ipcRenderer.on(LISTENER_EVENT.REFRESH_ACTIVE_TIMING, callback)
  ),
  subscribeChronographyRefreshEvent: callback => (
    ipcRenderer.on(LISTENER_EVENT.REFRESH_CHRONOGRAPHY, callback)
  ),
});

contextBridge.exposeInMainWorld(API_ENTRY.FETCHER, <ElectronGlobalFetcher>{
  fetchChronography: (dayRange: DayRange) => ipcRenderer.invoke(FETCHER_EVENT.FETCH_CHRONOGRAPHY, dayRange),
  fetchActiveTiming: () => ipcRenderer.invoke(FETCHER_EVENT.FETCH_ACTIVE_TIMING),
  stopTiming: () => ipcRenderer.invoke(FETCHER_EVENT.STOP_TIMING),
  fetchActivityData: activityInput => ipcRenderer.invoke(FETCHER_EVENT.FETCH_ACTIVITY_DATA, activityInput),
  postActivityInput: activityData => ipcRenderer.invoke(FETCHER_EVENT.POST_ACTIVITY_INPUT, activityData),
  repeatTiming: timingId => ipcRenderer.invoke(FETCHER_EVENT.REPEAT_TIMING, timingId),
  deleteTiming: (timingId, details) => ipcRenderer.invoke(FETCHER_EVENT.DELETE_TIMING, timingId, details),
});
