import { Header } from '@/components/Header';
import Link from 'next/link';
import { FormGeneratedByUser } from '@/components/FormGeneratedByUser';
import { Logotype } from '@/components/icons/Logotype';
import { getForm } from '@/lib/supabase/supabaseRequests';
import { auth } from '@clerk/nextjs/server';

export default async function Page({ params }: { params: { formId: string } }) {
  const data = await getForm(params.formId);
  const { userId } = auth();

  if (!data) {
    return <h2>Halo, coś się zepsuło i mnie nie widać</h2>; //TODO:
  }
  const { body, name, address_to_send, created_by } = data;

  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-[16px]">
        <Header>
          <div className="flex w-full justify-between">
            <Link href="/">
              <Logotype />
            </Link>
            {userId === created_by && (
              <Link href={'/my-forms'} className="bg-brand text-white">
                BACK TO MY-FORMS
              </Link>
            )}
          </div>
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
