import { ActivityView } from '@application/types';

declare global {
  interface Window {
    service: ElectronGlobalService;
    fetcher: ElectronGlobalFetcher;
  }
}

export interface ElectronGlobalService {
  getVersion: () => string;
  openActivityAppendWindow: () => void;
}

export interface ElectronGlobalFetcher {
  fetchChronography: () => Promise<ActivityView[]>;
}
