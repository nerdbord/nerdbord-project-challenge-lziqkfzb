'use server';

import { redirect } from 'next/navigation';
import { generateObject } from 'ai';
import { model } from '@/lib/ai_sdk/openai';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { InputJSONType } from '../types';
import { headers } from 'next/headers';
import { saveTemporaryForm } from '../supabase/supabaseRequests';

export async function generateFormFromPrompt(prompt: string) {
  'use server';
  const { object } = await generateObject({
    model,
    temperature: 0.7,
    system: `Fill out the data for a form, based on the user's message. Make checkbox "required" only if it's really necessary`,
    prompt,
    maxTokens: 512,
    schema: z.object({
      formName: z.string(),
      fields: z.array(
        z.object({
          name: z.string(),
          label: z.string(),
          placeholder: z.string().optional(),
          required: z.boolean().optional(),
          type: z.union([
            z.literal('checkbox'),
            z.literal('color'),
            z.literal('date'),
            z.literal('email'),
            z.literal('password'),
            z.literal('number'),
            z.literal('radio'),
            z.literal('text'),
            z.literal('time'),
            z.literal('url'),
            z.literal('week'),
            z.literal('month'),
            z.literal('tel'),
            z.literal('select'),
          ]),
          options: z.array(z.union([z.string(), z.number()])).optional(),
          minValue: z.number().optional(),
          maxValue: z.number().optional(),
          keyID: z.string().optional(),
        }),
      ),
    }),
  });

  const { fields, formName } = object as { fields: InputJSONType[]; formName: string };

  fields.forEach((field) => {
    field.keyID = nanoid();
  });

  const data = await saveTemporaryForm({ formName, fields });
  redirect(`/edit-your-form/${data[0].id}`);
}
