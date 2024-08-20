import { Header } from '@/components/Header';
import createSupabaseServerClient from '@/lib/supabase/server';

import Link from 'next/link';
import { FormGeneratedByUser } from '@/components/FormGeneratedByUser';
import { TextLogo } from '@/components/TextLogo';

export default async function Page({ params }: { params: { formId: string } }) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('forms').select('*').eq('id', params.formId).single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Nie znaleziono rekordu
      return null; //TODO:
    }
    throw error;
  }

  if (!data) {
    return <h2>Halo, coś się zepsuło i mnie nie widać</h2>; //TODO:
  }

  const { body, name, address_to_send } = await data;

  console.log(address_to_send, 'test');

  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-[16px]">
        <Header>
          <Link href="/">
            <TextLogo />
          </Link>
        </Header>
      </div>
      <FormGeneratedByUser formFields={body} formName={name} addressToSend={address_to_send} />
    </>
  );
}
