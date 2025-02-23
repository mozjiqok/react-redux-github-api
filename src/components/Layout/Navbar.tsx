import NavbarLink from "./NavbarLink";
import { privateRoutes, publicRoutes } from "../../routes/routes";
import NavButton from "../../ui/NavButton";
import { useNavigate } from 'react-router';
import { RouteNames } from '../../routes/routes';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../modules/auth/actionCreators";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout());
    navigate(RouteNames.LOGIN);
  }

  return (
  <nav className="bg-gray-800 p-4 flex justify-between">
    <div className="text-white font-bold">GitHub админка</div>
    <div>
      {user ? (
        privateRoutes.map( route => 
          <NavbarLink to={route.path} key={route.path}>{route.linkName}</NavbarLink>
        )
      ) : (
        publicRoutes.map( route => 
          <NavbarLink to={route.path} key={route.path}>{route.linkName}</NavbarLink>
        )
      )}
      {user && <NavButton onClick={handleLogout}>Выйти</NavButton>}
    </div>
  </nav>
  );
}