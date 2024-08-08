'use client';
import { useState } from 'react';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const AskAI = () => {
  const [generation, setGeneration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div
        className="bg-lime-400 outline-dashed outline-4 outline-green-600"
        onClick={async () => {
          setIsLoading(true);

          await fetch('/api/completion', {
            method: 'POST',
            body: JSON.stringify({
              prompt: 'Smerfy',
            }),
          }).then((response) => {
            response.json().then((json) => {
              setGeneration(json.text);
              setIsLoading(false);
            });
          });
        }}
      >
        Generate
      </div>

      {isLoading ? 'Loading...' : generation}
    </div>
  );
};

