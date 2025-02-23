import { FC, ReactNode } from 'react';

interface NavButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavButton: FC<NavButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <span 
      className={`text-white px-4 py-2 hover:bg-gray-700 cursor-pointer ${className}`} 
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default NavButton;