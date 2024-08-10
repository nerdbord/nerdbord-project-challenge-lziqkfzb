'use client';
import { useState, ChangeEvent } from 'react';
import type { formJSONType } from '@/lib/types';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const HomeInput = () => {
  const [formJSON, setFormJSON] = useState<formJSONType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState(
    'potrzebuje formularz zbierający date: imię, data urodzenia, adres zamieszkania, płeć',
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

    setFormJSON(json.elements);
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={prompt} onChange={handleInputChange} />
      <button type="submit" className="bg-lime-400 outline-dashed outline-4 outline-green-600">
        Generate
      </button>

      {isLoading ? 'Loading...' : JSON.stringify(formJSON)}
    </form>
  );
};
