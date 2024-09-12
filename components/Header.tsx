import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <div className="py-4px mb-[16px] mt-[12px] flex h-[44px] items-center px-[16px]">
      {children}
    </div>
  );
};
