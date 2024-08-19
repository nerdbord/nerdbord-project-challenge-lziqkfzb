import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'filled' | 'white';
}

export const LinkButton = ({ href, children, variant = 'filled' }: LinkButtonProps) => {
  return (
    <Link
      className={clsx(
        'flex shrink grow basis-0 items-center justify-center gap-2 rounded-lg border py-[12px] shadow',
        {
          'border-brand bg-brand': variant === 'filled',
        },
        { 'border-[#D0D5DD] bg-white text-gray-700': variant === 'white' },
      )}
      href={href}
    >
      <p
        className={clsx(
          'text-base font-semibold leading-normal',
          {
            'text-white': variant === 'filled',
          },
          { 'text-[#344054]': variant === 'white' },
        )}
      >
        {children}
      </p>
    </Link>
  );
};
