'use client';

import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/components/Button';
import { useSignIn } from '@clerk/nextjs';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  if (!isLoaded) {
    // handle loading state
    return null;
  }

  async function submit() {
    if (!signIn) {
      return null;
    }
    await signIn
      .create({
        identifier: email,
        password,
      })
      .then((result) => {
        if (result.status === 'complete') {
          console.log(result);
          setActive({ session: result.createdSessionId });
          router.push('/');
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
        toast.error(err.errors[0].longMessage);
        reset({ password: '' });
      });
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-[16px] py-[24px]">
      {error && <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>}
      <div>
        <label className="mb-[6px] text-sm font-medium leading-tight text-black" htmlFor="email">
          Email
        </label>
        <input
          className="w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]"
          {...register('email')}
          placeholder="Enter your email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors['email'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['email']?.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="mb-[6px] text-sm font-medium leading-tight text-black" htmlFor="password">
          Password
        </label>
        <input
          className="w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]"
          {...register('password')}
          placeholder="Enter your password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors['password'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['password']?.message as string}
          </span>
        )}
      </div>
      <div className="mt-[8px] flex w-full">
        <Button variant="filled" disabled={isPending} type="submit">
          {isPending ? 'loading...' : 'Sign In'}
        </Button>
      </div>
    </form>
  );
};
