import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return <div className="mb-[16px] flex h-[44px] items-center">{children}</div>;
};