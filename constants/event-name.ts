export const FETCHER_EVENT = {
  FETCH_CHRONOGRAPHY: 'fetchChronography',
  FETCH_ACTIVE_TIMING: 'fetchActiveTiming',
  STOP_TIMING: 'stopTiming',
  FETCH_ACTIVITY_DATA: 'fetchActivityData',
  POST_ACTIVITY_INPUT: 'postActivityInput',
  REPEAT_TIMING: 'repeatTiming',
  DELETE_TIMING: 'deleteTiming',
} as const;

export const SERVICE_EVENT = {
  OPEN_CHRONOGRAPHY_WINDOW: 'openChronographyWindow',
  OPEN_ACTIVITY_APPEND_WINDOW: 'openActivityAppendWindow',
  CLOSE_ACTIVITY_APPEND_WINDOW: 'closeActivityAppendWindow',
  QUIT_APPLICATION: 'quitApplication',
} as const;

export const LISTENER_EVENT = {
  REFRESH_ACTIVE_TIMING: 'refreshActiveTiming',
  REFRESH_CHRONOGRAPHY: 'refreshChronography',
} as const;
