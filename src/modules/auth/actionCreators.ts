import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./types";
import { githubApi } from "../../App";

export const login = createAsyncThunk('auth/login', async (user: User, { rejectWithValue }) => {
  try {
    githubApi.setUser(user);
    const returnedUser = await githubApi.login();
    // В целях безопасности токен лучше хранить в HttpOnly, Secure cookie,
    // но для этого нужен прокси бэкэнд сервер.
    localStorage.setItem("github_token", user.token);
    localStorage.setItem("github_username", user.login);
    githubApi.setUser(returnedUser);
    return returnedUser;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const restoreUser = createAsyncThunk('auth/restore', async () => {
  
  const storedToken = localStorage.getItem("github_token");
  const storedUsername = localStorage.getItem("github_username");
  
  if (storedToken && storedUsername) {
    githubApi.setUser({token: storedToken, login: storedUsername});
    return {token: storedToken, login: storedUsername};
  }
  return null;
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("github_token");
    localStorage.removeItem("github_username");
    githubApi.setUser(null);
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});