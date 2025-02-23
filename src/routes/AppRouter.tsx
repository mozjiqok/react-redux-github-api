import {Routes, Route, Navigate} from 'react-router';
import { privateRoutes, publicRoutes, RouteNames } from './routes'
import { useAppSelector } from '../hooks/redux';

const AppRouter = () => {
  const { user } = useAppSelector(state => state.user)

  return (
    user ? (
      <Routes>
        {privateRoutes.map( route => 
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        )}
        <Route
          path="*"
          element={<Navigate to={RouteNames.REPOSITORIES} replace />}
        />
      </Routes>
    ) : (
      <Routes>
        {publicRoutes.map( route => 
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        )}
        <Route
          path="*"
          element={<Navigate to={RouteNames.LOGIN} replace />}
        />
      </Routes>
    )
  )
}

export default AppRouter