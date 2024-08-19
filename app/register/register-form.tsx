'use client';

import { CreateUserInput, createUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUpWithEmailAndPassword } from '@/lib/actions/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState('');

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = (values) => {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword({
        data: values,
        emailRedirectTo: `${location.origin}/auth/callback`,
      });
      const { error } = JSON.parse(result);
      console.log(JSON.parse(result), 'rejestracja');

      if (error?.__isAuthError) {
        setError(error.name);
        toast.error(error.code);
        toast.error(error.name);
        reset({ password: '' });
        return;
      }

      toast.success('registered successfully');
      router.push('/login');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-[16px] py-[24px]">
      {error && <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>}
      <div>
        <label className="mb-[6px] text-sm font-medium leading-tight text-black" htmlFor="name">
          Name
        </label>
        <input
          className={
            'w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]'
          }
          {...register('name')}
          placeholder="Enter your name"
          id="name"
        />
        {errors['name'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['name']?.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="mb-[6px] text-sm font-medium leading-tight text-black" htmlFor="email">
          Email
        </label>
        <input
          className={
            'w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]'
          }
          {...register('email')}
          type="email"
          id="email"
          placeholder="Enter your email"
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
          className={
            'w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]'
          }
          {...register('password')}
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        {errors['password'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['password']?.message as string}
          </span>
        )}
      </div>
      <div>
        <label
          className="mb-[6px] text-sm font-medium leading-tight text-black"
          htmlFor="passwordConfirm"
        >
          Confirm Password
        </label>
        <input
          className={
            'w-full text-ellipsis rounded-lg border border-[#cfd4dc] bg-white px-[14px] py-[10px] text-base font-normal leading-normal placeholder:text-[#666666]'
          }
          {...register('passwordConfirm')}
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
        />
        {errors['passwordConfirm'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['passwordConfirm']?.message as string}
          </span>
        )}
      </div>
      <div className="flex gap-[12px] text-sm font-normal leading-tight text-[#344053]">
        <input
          className="accent-brand rounded-md border border-[#cfd4dc] bg-white"
          {...register('termsConfirm')}
          type="checkbox"
          id="termsConfirm"
        />
        <label className="text-sm font-normal leading-tight text-[#344053]" htmlFor="termsConfirm">
          I agree to Terms and Conditions
        </label>
        {errors['termsConfirm'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['termsConfirm']?.message as string}
          </span>
        )}
      </div>
      <div className="mt-[8px] flex w-full flex-col gap-[12px]">
        <Button variant="filled" disabled={isPending} type="submit">
          {isPending ? 'loading...' : 'Sign Up'}
        </Button>
        <div className="text-right">
          <span className="text-sm font-normal leading-tight text-black/40">
            Already have an account?
          </span>
          <Link className="text-sm font-bold leading-tight text-black/40 underline" href={'/login'}>
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};
