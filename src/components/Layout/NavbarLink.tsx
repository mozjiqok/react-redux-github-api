import { FC } from "react";
import NavButton from "../../ui/NavButton";
import { Link } from "react-router";

interface NavbarLinkProps {
  to: string;
  children: string;
}

const NavbarLink: FC<NavbarLinkProps> = ({ to, children }) => (
  <Link to={to}>
    <NavButton>{children}</NavButton>
  </Link>
);

export default NavbarLink;