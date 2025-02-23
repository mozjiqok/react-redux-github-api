import { createAsyncThunk } from '@reduxjs/toolkit';
import { Repository } from './types';
import { githubApi } from '../../App';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await githubApi.getRepositories();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRepository = createAsyncThunk(
  'repositories/add',
  async (data: Pick<Repository, 'name' | 'description' | 'private'>, { rejectWithValue }) => {
    try {
      return await githubApi.createRepository(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editRepository = createAsyncThunk(
  'repositories/edit',
  async (data: Pick<Repository, 'name' | 'description' | 'private'>, { rejectWithValue }) => {
    try {
      return await githubApi.updateRepository(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeRepository = createAsyncThunk(
  'repositories/remove',
  async (repoName: string, { rejectWithValue }) => {
    try {
      return await githubApi.deleteRepository(repoName);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);