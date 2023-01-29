import { contextBridge, ipcRenderer } from 'electron';

import { ElectronGlobalFetcher, ElectronGlobalService } from '@frontend/types';

import { API_ENTRY, EVENT_NAME } from '@constants';

contextBridge.exposeInMainWorld(API_ENTRY.SERVICE, <ElectronGlobalService>{
  getVersion: () => ['chrome', 'node', 'electron']
    .map(platform => `${platform}: ${process.versions[platform]}`)
    .join(', '),

  openActivityAppendWindow: () => ipcRenderer.invoke(EVENT_NAME.SERVICE.OPEN_ACTIVITY_APPEND_WINDOW),
  closeActivityAppendWindow: () => ipcRenderer.invoke(EVENT_NAME.SERVICE.CLOSE_ACTIVITY_APPEND_WINDOW),
});

contextBridge.exposeInMainWorld(API_ENTRY.FETCHER, <ElectronGlobalFetcher>{
  fetchChronography: () => ipcRenderer.invoke(EVENT_NAME.FETCHER.FETCH_CHRONOGRAPHY),
  fetchActiveTiming: () => ipcRenderer.invoke(EVENT_NAME.FETCHER.FETCH_ACTIVE_TIMING),
  stopTiming: () => ipcRenderer.invoke(EVENT_NAME.FETCHER.STOP_TIMING),
  fetchActivityData: activityInput => ipcRenderer.invoke(EVENT_NAME.FETCHER.FETCH_ACTIVITY_DATA, activityInput),
  postActivityInput: activityData => ipcRenderer.invoke(EVENT_NAME.FETCHER.POST_ACTIVITY_INPUT, activityData),
  repeatTiming: timingId => ipcRenderer.invoke(EVENT_NAME.FETCHER.REPEAT_TIMING, timingId),
});
