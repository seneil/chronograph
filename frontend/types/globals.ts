import { ActivityData, ActivityView, CurrentActivityView } from '@application/types';
import { DayRange } from '@frontend/types';
import { DateRange } from '@blueprintjs/datetime';

declare global {
  interface Window {
    service: ElectronGlobalService;
    fetcher: ElectronGlobalFetcher;
    listener: ElectronGlobalListener;
  }
}

export interface ElectronGlobalService {
  getVersion: () => string;
  openChronographyWindow: () => Promise<void>;
  openActivityAppendWindow: () => Promise<void>;
  closeActivityAppendWindow: () => void;
  quitApplication: () => void;
}

export interface ElectronGlobalFetcher {
  fetchChronography: (dayRange: DayRange) => Promise<{
    chronography: ActivityView[],
    dayRange: DateRange,
    previousActivityDay?: string,
    nextActivityDay?: string,
  }>;
  fetchActiveTiming: () => Promise<CurrentActivityView | null>,
  stopTiming: () => Promise<void>;
  fetchActivityData: (activityInput: string) => Promise<ActivityData>;
  postActivityInput: (activityData: ActivityData) => Promise<void>;
  repeatTiming: (timingId: number) => Promise<void>;
  deleteTiming: (timingId: number, details: string) => Promise<void>;
}

export interface ElectronGlobalListener {
  subscribeTimerRefreshEvent: (callback: () => void) => void,
}
