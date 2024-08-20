import { Header } from '@/components/Header';
import { EditFormTool } from './EditFormTool';
import createSupabaseServerClient from '@/lib/supabase/server';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import Link from 'next/link';
import { Form } from '@/components/icons/Form';
import { Tool } from '@/components/icons/Tool';
import { User } from '@/components/icons/User';
import { Button } from '@/components/Button';

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

  const { body, name } = data;

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

      <EditFormTool formFields={body} formName={name} />

      <nav className="b-white fixed bottom-0 w-full bg-white pb-[34px] sm:max-w-[450px]">
        <ul className="flex justify-between border-t border-[#cfd4dc] px-[48px] py-[9px]">
          <li>
            <Link href="/my-forms" className="flex flex-col items-center">
              <Form isGrayed={true} />
              <div className="text-center text-xs font-medium leading-tight text-black/60">
                Forms
              </div>
            </Link>
          </li>
          <li>
            <Link href="/create" className="flex flex-col items-center">
              <Tool />
              <div className="text-center text-xs font-bold leading-[18px] text-black/90">
                Form builder
              </div>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex flex-col items-center">
              <User isGrayed={true} />
              <div className="text-center text-xs font-medium leading-[18px] text-black/60">
                Profile
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
