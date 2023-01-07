import { getActivity } from '@application/chronography/create-activity';

export const fetchActivityData = async (activityInput: string) => (
  await getActivity(activityInput)
);
