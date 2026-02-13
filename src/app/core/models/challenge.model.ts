export interface Challenge {
  id: string;
  name: string;
  description?: string;
  mana_reward: number;
  goal_type: string;
  goal_value?: number;
  is_active?: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  is_available: boolean;
}
