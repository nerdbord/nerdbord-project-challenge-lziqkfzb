import { Header } from '@/components/Header';
import { headers } from 'next/headers';
import Link from 'next/link';

import { Logo } from '@/components/icons/Logo';
import { LinkButton } from '@/components/LinkButton';
import { Form } from '@/components/icons/Form';
import { Tool } from '@/components/icons/Tool';

import { FormCard } from './FormCard';

import { ProfileButton } from '@/components/ProfileButton';
import { auth } from '@clerk/nextjs/server';
import { getUserForms } from '@/lib/supabase/supabaseRequests';
import Image from 'next/image';

export default async function Page() {
  const { userId } = auth();
  const forms = await getUserForms(userId!);

  const headersList = headers();
  const domain = headersList.get('host');

  return (
    <>
      <Header>
        <Link href="/">
          <Logo />
        </Link>
      </Header>

      <div className="flex h-full flex-grow flex-col items-center bg-white px-[16px] pb-[170px]">
        {forms?.length === 0 ? (
          <>
            <div>
              <h2 className="text-center text-lg font-bold leading-7 text-black">
                {'You don’t have any forms yet'}
              </h2>
              <h3 className="text-center text-base font-normal leading-normal text-gray-dark">
                Start now!
              </h3>
            </div>
            <Image src={'/form.png'} width={308} height={290} alt="" />
            <div></div>
          </>
        ) : (
          <>
            <h2 className="mb-[16px] self-start text-left text-lg font-bold leading-7 text-black">
              {'Your forms'}
            </h2>
            <ul className="flex w-full flex-col gap-[12px]">
              {forms!.map((form) => (
                <FormCard
                  formId={form.id}
                  name={form.name}
                  host={domain!}
                  key={form.id}
                  prompt={form.prompt}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        <nav className="b-white fixed bottom-0 w-full border-t border-gray bg-white pb-[34px] sm:max-w-[450px]">
          <div className="px-[16px] py-[12px]">
            <LinkButton href="/create">Create a new form</LinkButton>
          </div>
          <ul className="flex justify-between border-t border-gray px-[48px] py-[9px]">
            <li>
              <Link href="/my-forms" className="flex flex-col items-center">
                <Form />
                <div className="text-center text-xs font-medium leading-tight text-black">
                  Forms
                </div>
              </Link>
            </li>
            <li>
              <Link href="/create" className="flex flex-col items-center">
                <Tool isGrayed={true} />
                <div className="text-center text-xs font-bold leading-[18px] text-gray-dark">
                  Form builder
                </div>
              </Link>
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
