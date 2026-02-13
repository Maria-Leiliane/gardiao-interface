export interface Habit {
  id: string;
  user_id?: string;
  name: string;
  goal_type?: string;
  frequency?: string;
  created_at?: string;
}

export interface HabitLog {
  id?: string;
  habit_id: string;
  user_id?: string;
  log_date?: string;
  value: number;
}

export interface CreateHabitPayload {
  name: string;
  goal_type?: string;
  frequency?: string;
}
