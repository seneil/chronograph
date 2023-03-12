import { getActivity } from '@application/chronography/create-activity';

export const fetchActivityData = (activityInput: string) => (
  getActivity(activityInput)
);
