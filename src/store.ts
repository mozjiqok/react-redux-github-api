import { combineReducers, configureStore } from '@reduxjs/toolkit';
import repositories from './modules/repositories/repositoriesSlice';
import user from './modules/auth/userSlice';

const rootReducer = combineReducers({
  repositories,
  user
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];