'use server';
import { auth } from '@clerk/nextjs/server';

export const getToken = async () => {
  const { getToken } = auth();
  const token = await getToken({ template: 'supabase' });
  return token;
};
