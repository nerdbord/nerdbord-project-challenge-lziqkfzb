'use client';
import Image from 'next/image';
import useSupabaseClient from '@/lib/supabase/client';
import { Button } from './Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const SingInProviders = () => {
  const [clientDomain, setClientDomain] = useState<string>('');
  useEffect(() => {
    setClientDomain(window.location.origin);
  }, []);

  const supabase = useSupabaseClient();

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${clientDomain}/auth/callback`,
      },
    });
  };

  return (
    <div className="mt-[12px] flex flex-col gap-[32px]">
      <Button onClick={loginWithGitHub} variant="white">
        <div className="flex gap-[12px]">
          <Image className="pr-2" src="/images/github.svg" alt="" width={24} height={24} /> Sign in
          with Github
        </div>
      </Button>
      <div className="text-center">
        <span className="text-sm font-normal leading-tight text-black/40">
          {'By signing in I agree to '}
        </span>
        <Link
          className="text-sm font-normal leading-tight text-black/40 underline"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <span className="text-sm font-normal leading-tight text-black/40"> </span>
      </div>
    </div>
  );
};
