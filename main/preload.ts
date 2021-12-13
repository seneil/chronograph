import { contextBridge } from 'electron';

const windowApi = {
  getVersion: () => process.versions.node,
};

contextBridge.exposeInMainWorld('electronAPI', windowApi);
