'use client';
import { useState, ChangeEvent } from 'react';
import type { InputJSONType } from '@/lib/types';
import { GeneratedForm } from './GeneratedForm';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const HomeInput = () => {
  const [formFields, setFormFields] = useState<InputJSONType[]>([]);
  const [formName, setFormName] = useState('');
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

    const response = await fetch('/api/genre-base', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
      }),
    });
    const json = await response.json();

    setFormFields(json.elements);
    setFormName(json.formName);
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={prompt} onChange={handleInputChange} />
        <button type="submit" className="bg-lime-400 outline-dashed outline-4 outline-green-600">
          Generate
        </button>
        {isLoading ? 'Loading...' : JSON.stringify(formFields)}
      </form>
      {formName && <GeneratedForm formFields={formFields} formName={formName} />}
    </>
  );
};
