import { ActivityGroupView } from '@application/types/views/activity';

export { ElectronGlobalService, ElectronGlobalFetcher } from './globals';

export interface ActivityGroup {
  date: string;
  total: number;
  activities: ActivityGroupView[];
}
