interface ActivityBase {
  timing_id: number;
  category_id: number;
  category_name: string;
  activity_id: number;
  activity_name: string;
  description: string;
}

export interface ActivityView extends ActivityBase {
  start_at: Date;
  end_at: Date | null;
}

export interface ActivityGroupView extends ActivityBase {
  start_time_at: string;
  end_time_at: string | null;
  duration: number | null;
}
