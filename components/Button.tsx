import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'filled' | 'white';
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  variant = 'filled',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'flex shrink grow basis-0 items-center justify-center gap-2 rounded-lg border py-[12px] shadow',
        {
          'border-brand bg-brand disabled:border-[#E9D7FE] disabled:bg-[#E9D7FE]':
            variant === 'filled',
        },
        { 'border-[#D0D5DD] bg-white text-gray-700': variant === 'filled' },
      )}
      disabled={disabled}
    >
      <p
        className={clsx(
          "font-['Inter'] text-base font-semibold leading-normal",
          {
            'text-white': variant === 'filled',
          },
          { 'text-[#344054] disabled:text-[#D0D5DD]': variant === 'white' },
        )}
      >
        {children}
      </p>
    </button>
  );
};
