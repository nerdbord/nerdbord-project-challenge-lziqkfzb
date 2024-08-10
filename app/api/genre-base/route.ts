import { generateObject } from 'ai';
import { model } from '@/lib/ai_sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model,
    temperature: 0.7,
    system: `Fill out the data for a form, based on the user's message. Reply in english`,
    prompt,
    maxTokens: 512,
    schema: z.object({
      elements: z.array(
        z.object({
          name: z.string(),
          label: z.string(),
          placeholder: z.string().optional(),
          required: z.boolean(),
          type: z.union([
            z.literal('checkbox'),
            z.literal('color'),
            z.literal('date'),
            z.literal('email'),
            z.literal('file'),
            z.literal('password'),
            z.literal('date'),
            z.literal('number'),
            z.literal('password'),
            z.literal('radio'),
            z.literal('range'),
            z.literal('text'),
            z.literal('time'),
            z.literal('url'),
            z.literal('week'),
            z.literal('month'),
            z.literal('tel'),
            z.literal('date'),
            z.literal('select'),
          ]),
          options: z.array(z.string()).optional(),
        }),
      ),
    }),
  });
  return result.toJsonResponse();
}
