import React from "react"
import AuthPage from '../pages/AuthPage'
import RepositoriesPage from "../pages/RepositoriesPage"

export interface IRoute {
  path: string;
  component: React.ComponentType;
  linkName: string;
}

export enum RouteNames {
  LOGIN = '/auth',
  REPOSITORIES = '/repositories',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, component: AuthPage, linkName: 'Войти'},
]

export const privateRoutes: IRoute[] = [
  {path: RouteNames.REPOSITORIES, component: RepositoriesPage, linkName: 'Репозитории'},
]