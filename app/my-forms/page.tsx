import { Header } from '@/components/Header';
import createSupabaseServerClient from '@/lib/supabase/server';
import { headers } from 'next/headers';
import Link from 'next/link';
import { TextLogo } from '@/components/TextLogo';
import { LinkButton } from '@/components/LinkButton';
import { Form } from '@/components/icons/Form';
import { Tool } from '@/components/icons/Tool';
import { User } from '@/components/icons/User';
import { FormCard } from './FormCard';
import { UserButton, SignOutButton } from '@clerk/nextjs';

export default async function Page({ params }: { params: { formId: string } }) {
  // const headersList = headers();
  // const host = headersList.get('host') as string;
  // const supabase = await createSupabaseServerClient();
  // const { data } = await supabase.auth.getUser();

  // if (!data.user) {
  //   return <div> {'WRÓĆ JAK SIĘ PODSZKOLISZ, LUB ZAłożysz KONTO ;)'}</div>;
  // }

  // const userID = data.user.id;
  // console.log(userID);

  // const databaseRes = await supabase.from('forms').select('*').eq('created_by', userID);

  // if (!databaseRes.data) {
  //   return <h2>Halo, coś się zepsuło i Formów nie widać</h2>; //TODO:
  // }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-[16px] pb-[74px]">
        <Header>
          <Link href="/">
            <TextLogo />
          </Link>
        </Header>

        <div className="flex flex-col gap-[16px] px-[16px]">
          <div className="text-lg font-bold leading-7 text-black/80">Your forms</div>
          {/* <ul className="flex flex-col gap-[12px]">
            {databaseRes.data.map((form) => (
              <FormCard formId={form.id} name={form.name} host={host} key={form.id} />
            ))}
          </ul> */}
        </div>
      </div>
      <div>
        <nav className="b-white fixed bottom-0 w-full border-t border-[#cfd4dc] bg-white pb-[34px] sm:max-w-[450px]">
          <div className="px-[16px] py-[12px]">
            <LinkButton href="/create">Create a new form</LinkButton>
          </div>
          <ul className="flex justify-between border-t border-[#cfd4dc] px-[48px] py-[9px]">
            <li>
              <Link href="/my-forms" className="flex flex-col items-center">
                <Form />
                <div className="text-center text-xs font-medium leading-tight text-black/90">
                  Forms
                </div>
              </Link>
            </li>
            <li>
              <Link href="/create" className="flex flex-col items-center">
                <Tool isGrayed={true} />
                <div className="text-center text-xs font-bold leading-[18px] text-black/60">
                  Form builder
                </div>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex flex-col items-center">
                <SignOutButton>
                  <div>
                    <User isGrayed={true} />
                    <div className="text-center text-xs font-medium leading-[18px] text-black/60">
                      Profile
                    </div>
                  </div>
                </SignOutButton>
                <UserButton afterSwitchSessionUrl="/" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
