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
          'border-brand bg-brand disabled:border-brand-disabled disabled:bg-brand-disabled':
            variant === 'filled',
        },
        { 'border-gray bg-white text-gray': variant === 'white' },
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
          { 'border-gray-light text-jeans-dark disabled:text-gray': variant === 'white' },
        )}
      >
        {children}
      </div>
    </button>
  );
};
