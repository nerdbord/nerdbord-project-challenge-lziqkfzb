'use client';

import { User } from './icons/User';
import { useClerk } from '@clerk/nextjs';

export const ProfileButton = () => {
  const { openUserProfile } = useClerk();

  return (
    <button className="flex flex-col items-center" onClick={() => openUserProfile()}>
      <div className="flex flex-col items-center">
        <User isGrayed={true} />
        <div className="text-center text-xs font-medium leading-[18px] text-gray-dark">Profile</div>
      </div>
    </button>
  );
};
