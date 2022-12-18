import { contextBridge, ipcRenderer } from 'electron';

import { ElectronGlobalFetcher, ElectronGlobalService } from '@frontend/types';

import { API_ENTRY, EVENT_NAME } from '@constants';

contextBridge.exposeInMainWorld(API_ENTRY.SERVICE, <ElectronGlobalService>{
  getVersion: () => ['chrome', 'node', 'electron']
    .map(platform => `${platform}: ${process.versions[platform]}`)
    .join(', '),

  createActivityAppendWindow: () => ipcRenderer.invoke(EVENT_NAME.SERVICE.CREATE_ACTIVITY_APPEND_WINDOW),
});

contextBridge.exposeInMainWorld(API_ENTRY.FETCHER, <ElectronGlobalFetcher>{
  getChronography: () => ipcRenderer.invoke(EVENT_NAME.FETCHER.GET_CHRONOGRAPHY),
});
