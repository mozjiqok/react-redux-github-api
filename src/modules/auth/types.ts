export interface User {
  token: string;
  login: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}