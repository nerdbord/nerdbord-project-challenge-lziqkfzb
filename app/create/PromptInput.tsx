'use client';
import { useState, ChangeEvent, useTransition } from 'react';
import { generateFormFromPrompt } from '@/lib/actions/actions';
import { Send } from '@/components/icons/Send';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const PromptInput = () => {
  const [isPending, startTransition] = useTransition();

  const [prompt, setPrompt] = useState(
    'potrzebuję zbierać danę użytkowników, imię, płeć, data urodzenia, ulubiony kolor, czy poleciłby naszą firmę, potwierdzenie o przeczytaniu regulaminu, jak nas ocenia w skalo od jeden do pięć',
  );

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => generateFormFromPrompt(prompt));
  };

  return (
    <>
      <div>
        <div className="mb-[16px] overflow-x-scroll px-[14px]">
          <ul className="flex w-max items-baseline divide-x divide-solid divide-[#cfd4dc] overflow-clip rounded-lg border border-[#cfd4dc] text-sm font-semibold leading-tight text-[#1d2838] children:flex children:h-[40px] children:items-center children:justify-center children:bg-[#f3f3f3]">
            <li
              className="w-[136px]"
              onClick={() => {
                setPrompt(
                  'I want to collect customers name, age, sex, date of birth, country, city, address, zip code',
                );
              }}
            >
              Traditional
            </li>
            <li
              className="w-[136px]"
              onClick={() => {
                setPrompt(`create three questions for me for a history quiz
in the format question, "Answers" <three answers of which only one is correct>`);
              }}
            >
              Quiz
            </li>
            <li
              className="w-[136px]"
              onClick={() => {
                setPrompt(`create a customer satisfaction survey about using our store, let them rate the speed of service, product quality, price
Let them rate on a scale of 1-5`);
              }}
            >
              Survey
            </li>
          </ul>
        </div>
        <form
          className="flex w-full gap-[12px] border border-[#cfd4dc] p-[16px]"
          onSubmit={onSubmit}
        >
          <input
            className="flex shrink grow basis-0 items-center justify-start self-stretch truncate rounded-lg border border-[#cfd4dc] bg-white px-3.5 py-2.5 text-base font-normal leading-normal text-[#0f1728] shadow placeholder:text-[#667084]"
            value={prompt}
            onChange={handlePromptChange}
            disabled={isPending}
            placeholder="Describe your form "
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg border border-brand bg-brand p-[12px] shadow"
          >
            {isPending ? <MoreHorizontal /> : <Send />}
          </button>
        </form>
      </div>
    </>
  );
};
