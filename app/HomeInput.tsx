'use client';
import { useState, ChangeEvent, useTransition } from 'react';
import { generateFormFromPrompt } from '@/lib/actions/actions';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const HomeInput = () => {
  const [isPending, startTransition] = useTransition();

  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState(
    'potrzebuję zbierać danę użytkowników, imię, płeć, data urodzenia, ulubiony kolor, czy poleciłby naszą firmę, potwierdzenie o przeczytaniu regulaminu, jak nas ocenia w skalo od jeden do pięć',
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    startTransition(() => generateFormFromPrompt(prompt));

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={prompt} onChange={handleInputChange} />
        <button
          type="submit"
          className="bg-unclaimedOrange outline-undaunted outline-dashed outline-4"
        >
          {isPending ? 'Przetwarzanie...' : 'Wyślij'}
        </button>
      </form>
    </>
  );
};
