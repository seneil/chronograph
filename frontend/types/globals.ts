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
  closeActivityAppendWindow: () => void;
}

export interface ElectronGlobalFetcher {
  fetchChronography: (dayStart?: string, dayEnd?: string) => Promise<{
    chronography: ActivityView[],
    timing: CurrentActivityView | null,
  }>;
  stopTiming: () => Promise<void>;
  fetchActivityData: (activityInput: string) => Promise<ActivityData>;
  postActivityInput: (activityData: ActivityData) => Promise<void>;
  repeatTiming: (timingId: number) => Promise<void>;
  deleteTiming: (timingId: number, details: string) => Promise<void>;
}
