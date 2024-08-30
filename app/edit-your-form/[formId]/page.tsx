import { Header } from '@/components/Header';
import { EditFormTool } from './EditFormTool';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import Link from 'next/link';
import { Form } from '@/components/icons/Form';
import { Tool } from '@/components/icons/Tool';
import { ProfileButton } from '@/components/ProfileButton';
import { getTemporaryForm } from '@/lib/supabase/supabaseRequests';

export default async function Page({ params }: { params: { formId: string } }) {
  const data = await getTemporaryForm(params.formId);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-[16px]">
        <Header>
          <Link href="/">
            <ArrowLeft />
          </Link>
          Form preview
        </Header>
      </div>
      {!data ? (
        <h2>NOT FOUND</h2> //TODO: error handler
      ) : (
        <>
          <EditFormTool formFields={JSON.parse(data.body)} formName={data.name} />
          <nav className="b-white fixed bottom-0 w-full bg-white pb-[34px] sm:max-w-[450px]">
            <ul className="flex justify-between border-t border-gray px-[48px] py-[9px]">
              <li>
                <Link href="/my-forms" className="flex flex-col items-center">
                  <Form isGrayed={true} />
                  <div className="text-center text-xs font-medium leading-tight text-gray-dark">
                    Forms
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/create" className="flex flex-col items-center">
                  <Tool />
                  <div className="text-center text-xs font-bold leading-[18px] text-black">
                    Form builder
                  </div>
                </Link>
              </li>
              <li>
                <ProfileButton />
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
