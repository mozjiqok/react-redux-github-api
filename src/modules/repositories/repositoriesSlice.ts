import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchRepositories, addRepository, editRepository, removeRepository} from './actionCreators';
import { RepositoriesState, Repository } from './types';

const initialState: RepositoriesState = {
  list: [],
  selectedRepo: null,
  loading: false,
  formLoading: false,
  error: null,
  formError: null,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setFormError: (state, action: PayloadAction<string | null>) => {
      state.formError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action: PayloadAction<Repository[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addRepository.fulfilled, (state, action: PayloadAction<Repository>) => {
        state.formLoading = false;
        state.list.push(action.payload);
      })
      .addCase(addRepository.pending, (state) => {
        state.formLoading = true;
        state.formError = null;
      })
      .addCase(addRepository.rejected, (state, action) => {
        state.formLoading = false;
        state.formError = action.payload as string;
      })

      .addCase(editRepository.fulfilled, (state, action: PayloadAction<Repository>) => {
        state.formLoading = false;
        const index = state.list.findIndex((repo) => repo.name === action.payload.name);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(editRepository.pending, (state) => {
        state.formError = null;
        state.formLoading = true;
      })
      .addCase(editRepository.rejected, (state, action) => {
        state.formLoading = false;
        state.formError = action.payload as string;
      })

      .addCase(removeRepository.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter((repo) => repo.name !== action.payload);
      });
  },
});

export const { setFormError } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;