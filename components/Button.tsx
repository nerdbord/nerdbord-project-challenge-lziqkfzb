'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'filled' | 'white';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  onClick,
  children,
  variant = 'filled',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'flex shrink grow basis-0 items-center justify-center gap-2 rounded-lg border py-[12px] shadow',
        {
          'border-brand bg-brand disabled:border-[#E9D7FE] disabled:bg-[#E9D7FE]':
            variant === 'filled',
        },
        { 'border-[#D0D5DD] bg-white text-gray-700': variant === 'white' },
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <div
        className={clsx(
          'text-base font-semibold leading-normal',
          {
            'text-white': variant === 'filled',
          },
          { 'text-[#344054] disabled:text-[#D0D5DD]': variant === 'white' },
        )}
      >
        {children}
      </div>
    </button>
  );
};
