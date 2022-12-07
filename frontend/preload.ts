import { contextBridge, ipcRenderer } from 'electron';

import { IElectronGlobal } from './types';

import { API_ENTRY } from './constants';

contextBridge.exposeInMainWorld(API_ENTRY, <IElectronGlobal>{
  getVersion: () => ['chrome', 'node', 'electron']
    .map(platform => `${platform}: ${process.versions[platform]}`)
    .join(', '),

  createActivityAppendWindow: () => ipcRenderer.invoke('create-activity-append-window'),
});
