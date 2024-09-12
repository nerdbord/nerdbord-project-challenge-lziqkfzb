'use client';
import { useState, ChangeEvent, useTransition, useRef, useEffect } from 'react';
import { generateFormFromPrompt } from '@/lib/actions/actions';
import { Send } from '@/components/icons/Send';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const PromptInput = () => {
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState(
    'potrzebuję zbierać danę użytkowników, imię, płeć, data urodzenia, ulubiony kolor, czy poleciłby naszą firmę, potwierdzenie o przeczytaniu regulaminu, jak nas ocenia w skalo od jeden do pięć',
  );
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';

      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';

      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  const handleFocus = () => {
    setIsInteracting(true);
  };

  const handleBlur = () => {
    // Jeśli textarea nie ma wartości, przestajemy pokazywać przycisk po utracie fokusu
    if (!prompt) {
      setIsInteracting(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => generateFormFromPrompt(prompt));
  };

  return (
    <>
      <div>
        <div className="mb-[16px] overflow-x-scroll px-[14px]">
          <ul className="flex w-max items-baseline divide-x divide-solid divide-gray overflow-clip rounded-lg border border-gray text-sm font-semibold leading-tight text-jeans-dark children:flex children:h-[40px] children:items-center children:justify-center children:bg-gray-light">
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
          className="flex w-full items-end gap-[12px] border border-[#cfd4dc] p-[16px]"
          onSubmit={onSubmit}
        >
          <textarea
            className="w-full resize-none overflow-hidden rounded-lg border border-gray bg-white px-3.5 py-2.5 text-base font-normal leading-normal text-black shadow placeholder:text-jeans-light"
            value={prompt}
            onChange={handlePromptChange}
            ref={textareaRef}
            disabled={isPending}
            placeholder="Describe your form "
            rows={1}
            wrap="soft"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {(isInteracting || prompt) && (
            <button
              type="submit"
              className="items-center justify-center rounded-lg border border-brand bg-brand p-[12px] shadow"
              disabled={!prompt}
            >
              {isPending ? <MoreHorizontal /> : <Send />}
            </button>
          )}
        </form>
      </div>
    </>
  );
};
