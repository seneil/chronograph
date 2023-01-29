export const EVENT_NAME = {
  FETCHER: {
    FETCH_CHRONOGRAPHY: 'fetchChronography',
    FETCH_ACTIVE_TIMING: 'fetchActiveTiming',
    STOP_TIMING: 'stopTiming',
    FETCH_ACTIVITY_DATA: 'fetchActivityData',
    POST_ACTIVITY_INPUT: 'postActivityInput',
    REPEAT_TIMING: 'repeatTiming',
    DELETE_TIMING: 'deleteTiming',
  },
  SERVICE: {
    OPEN_ACTIVITY_APPEND_WINDOW: 'open-activity-append-window',
    CLOSE_ACTIVITY_APPEND_WINDOW: 'close-activity-append-window',
  },
} as const;
