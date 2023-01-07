export interface TimingTable {
  id: number;
  activity_id: number;
  description: string;
  start_at: string;
  end_at: string | null;
  created_at: string;
}
