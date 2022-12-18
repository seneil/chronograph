declare global {
  interface Window { service: ElectronGlobalService; }
}

export interface ElectronGlobalService {
  getVersion: () => string,
  createActivityAppendWindow: () => void,
}

export interface ElectronGlobalFetcher {
  getChronography: () => void,
}
