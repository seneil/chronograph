import { ActivityData, ActivityView, CurrentActivityView } from '@application/types';

declare global {
  interface Window {
    service: ElectronGlobalService;
    fetcher: ElectronGlobalFetcher;
  }
}

export interface ElectronGlobalService {
  getVersion: () => string;
  openActivityAppendWindow: () => Promise<void>;
}

export interface ElectronGlobalFetcher {
  fetchChronography: () => Promise<ActivityView[]>;
  fetchActiveTiming: () => Promise<CurrentActivityView>;
  stopTiming: () => Promise<void>;
  fetchActivityData: (activityInput: string) => Promise<ActivityData>;
  fetchActivityInput: (activityData: ActivityData) => Promise<void>;
}
