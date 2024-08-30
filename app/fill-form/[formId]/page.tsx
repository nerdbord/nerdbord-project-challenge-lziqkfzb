import { Header } from '@/components/Header';
import Link from 'next/link';
import { FormGeneratedByUser } from '@/components/FormGeneratedByUser';
import { TextLogo } from '@/components/TextLogo';
import { getForm } from '@/lib/supabase/supabaseRequests';

export default async function Page({ params }: { params: { formId: string } }) {
  const data = await getForm(params.formId);

  if (!data) {
    return <h2>Halo, coś się zepsuło i mnie nie widać</h2>; //TODO:
  }
  const { body, name, address_to_send } = data;

  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-[16px]">
        <Header>
          <Link href="/">
            <TextLogo />
          </Link>
        </Header>
      </div>
      <FormGeneratedByUser
        formFields={JSON.parse(body)}
        formName={name}
        addressToSend={address_to_send}
      />
    </>
  );
}
