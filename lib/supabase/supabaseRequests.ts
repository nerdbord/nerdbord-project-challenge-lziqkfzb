'use server';
import { supabaseServerClient } from './server';
import { auth } from '@clerk/nextjs/server';
import type { InputJSONType } from '../types';
import { redirect } from 'next/navigation';

export const getUserForms = async (userId: string) => {
  const supabase = await supabaseServerClient();
  const { data } = await supabase.from('forms').select('*').eq('created_by', userId);

  return data;
};

export const getForm = async (formId: string) => {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.from('forms').select('*').eq('id', formId).single();

  if (error) {
    console.log(error); //TODO:
    return { body: JSON.stringify([]), name: 'NOT FOUND', address_to_send: '' };
  }

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
    console.log(error); //TODO:
    return { body: JSON.stringify([]), name: 'NOT FOUND', address_to_send: '' };
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

  redirect(`/fill-form/${data[0].id}`);
};

export const deleteForm = async (formId: string) => {
  const supabase = await supabaseServerClient();
  const { error } = await supabase.from('forms').delete().eq('id', formId);

  if (error) {
    return error;
  }
  return null;
};

export const deleteOldTemporaryForms = async () => {
  const supabase = await supabaseServerClient();
  const { error } = await supabase
    .from('temporary_forms')
    .delete()
    .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (error) {
    return error;
  }
  return null;
};
