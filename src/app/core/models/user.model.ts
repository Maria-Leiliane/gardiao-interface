export interface User {
  id?: string;
  email: string;
  name: string;
  theme?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserMana {
  user_id: string;
  balance: number;
  updated_at?: string;
}

export interface AuthPayload {
  email: string;
  name?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

export interface UpdateProfilePayload {
  name?: string;
  theme?: string;
}

export interface UpdateEmailPayload {
  email: string;
}

export interface UpdatePasswordPayload {
  current: string;
  next: string;
}
