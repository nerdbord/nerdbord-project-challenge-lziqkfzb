'use server';
import { supabaseServerClient } from './server';
import { auth } from '@clerk/nextjs/server';
import type { InputJSONType } from '../types';

export const getUserForms = async (userId: string) => {
  const supabase = await supabaseServerClient();

  const { data } = await supabase.from('forms').select('*').eq('created_by', userId);

  return data;
};

export const getTemporaryForm = async (formId: string) => {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from('temporary_forms')
    .select('*')
    .eq('id', formId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Nie znaleziono rekordu
      return null; //TODO:
    }
    throw error;
  }
  return data;
};

export const saveTemporaryForm = async ({
  formName,
  fields,
}: {
  formName: string;
  fields: InputJSONType[];
}) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from('temporary_forms')
    .insert([
      {
        name: formName,
        body: JSON.stringify(fields),
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting form:', error);
    throw error;
  }

  return data;
};

export const saveForm = async ({
  formName,
  fields,
  addressToSend,
}: {
  formName: string;
  fields: InputJSONType[];
  addressToSend: string;
}) => {
  const { userId } = auth();
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from('forms')
    .insert([
      {
        created_by: userId,
        name: formName,
        body: JSON.stringify(fields),
        address_to_send: addressToSend,
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting form:', error);
    throw error;
  }

  return data;
};
