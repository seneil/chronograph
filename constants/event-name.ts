import { API_ENTRY } from './api-entry';

export const EVENT_NAME = {
  [API_ENTRY.FETCHER]: {
    FETCH_CHRONOGRAPHY: 'fetchChronography',
    FETCH_ACTIVE_TIMING: 'fetchActiveTiming',
    STOP_TIMING: 'stopTiming',
    FETCH_ACTIVITY_DATA: 'fetchActivityData',
    POST_ACTIVITY_INPUT: 'postActivityInput',
    REPEAT_TIMING: 'repeatTiming',
    DELETE_TIMING: 'deleteTiming',
  },
  [API_ENTRY.SERVICE]: {
    OPEN_ACTIVITY_APPEND_WINDOW: 'openActivityAppendWindow',
    CLOSE_ACTIVITY_APPEND_WINDOW: 'closeActivityAppendWindow',
  },
  [API_ENTRY.LISTENER]: {
    REFRESH_ACTIVE_TIMING: 'refreshActiveTiming',
  },
} as const;
