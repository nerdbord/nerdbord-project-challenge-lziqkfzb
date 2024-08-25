'use client';

import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from '@/lib/actions/actions';
import toast from 'react-hot-toast';
import { Button } from '@/components/Button';

export const LoginForm = () => {
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

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(values);

      console.log(JSON.parse(result));

      const { error } = JSON.parse(result);
      if (error?.__isAuthError) {
        setError(error.name);
        toast.error(error.name);
        console.log('Error message', error);
        reset({ password: '' });
        return;
      }

      setError('');
      toast.success('successfully logged in');
      router.push('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-[16px] py-[24px]">
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
