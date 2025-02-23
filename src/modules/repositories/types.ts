export interface Repository {
  id: number;
  name: string;
  description: string | null;
  private: boolean;
}

export interface RepositoriesState {
  list: Repository[];
  selectedRepo: Repository | null;
  loading: boolean;
  formLoading: boolean;
  error: string | null;
  formError: string | null;
}