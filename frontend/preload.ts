import { contextBridge, ipcRenderer } from 'electron';

import { DayRange, ElectronGlobalFetcher, ElectronGlobalService } from '@frontend/types';

import { API_ENTRY, EVENT_NAME } from '@constants';
import { ElectronGlobalListener } from '@frontend/types/globals';

contextBridge.exposeInMainWorld(API_ENTRY.SERVICE, <ElectronGlobalService>{
  getVersion: () => ['chrome', 'node', 'electron']
    .map(platform => `${platform}: ${process.versions[platform]}`)
    .join(', '),

  openChronographyWindow: () => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.SERVICE].OPEN_CHRONOGRAPHY_WINDOW),
  openActivityAppendWindow: () => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.SERVICE].OPEN_ACTIVITY_APPEND_WINDOW),
  closeActivityAppendWindow: () => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.SERVICE].CLOSE_ACTIVITY_APPEND_WINDOW),
  quitApplication: () => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.SERVICE].QUIT_APPLICATION),
});

contextBridge.exposeInMainWorld(API_ENTRY.LISTENER, <ElectronGlobalListener>{
  subscribeTimerRefreshEvent: callback => (
    ipcRenderer.on(EVENT_NAME[API_ENTRY.LISTENER].REFRESH_ACTIVE_TIMING, callback)
  ),
});

contextBridge.exposeInMainWorld(API_ENTRY.FETCHER, <ElectronGlobalFetcher>{
  fetchChronography: (dayRange: DayRange) => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].FETCH_CHRONOGRAPHY, dayRange),
  fetchActiveTiming: () => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].FETCH_ACTIVE_TIMING),
  stopTiming: () => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].STOP_TIMING),
  fetchActivityData: activityInput => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].FETCH_ACTIVITY_DATA, activityInput),
  postActivityInput: activityData => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].POST_ACTIVITY_INPUT, activityData),
  repeatTiming: timingId => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].REPEAT_TIMING, timingId),
  deleteTiming: (timingId, details) => ipcRenderer.invoke(EVENT_NAME[API_ENTRY.FETCHER].DELETE_TIMING, timingId, details),
});
