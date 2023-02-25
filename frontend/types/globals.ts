import { ActivityData, ActivityView, CurrentActivityView } from '@application/types';
import { DayRange } from '@frontend/types';
import { DateRange } from '@blueprintjs/datetime';

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
  fetchChronography: (dayRange: DayRange) => Promise<{
    chronography: ActivityView[],
    timing: CurrentActivityView | null,
    dayRange: DateRange,
    previousActivityDay?: string,
    nextActivityDay?: string,
  }>;
  stopTiming: () => Promise<void>;
  fetchActivityData: (activityInput: string) => Promise<ActivityData>;
  postActivityInput: (activityData: ActivityData) => Promise<void>;
  repeatTiming: (timingId: number) => Promise<void>;
  deleteTiming: (timingId: number, details: string) => Promise<void>;
}
