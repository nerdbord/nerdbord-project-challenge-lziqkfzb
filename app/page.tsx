import { Header } from '@/components/Header';
import { TextLogo } from '@/components/TextLogo';
import Image from 'next/image';
import { LinkButton } from '@/components/LinkButton';
import { Button } from '@/components/Button';
import getUserSession from '@/lib/getUserSession';
import createSupabaseServerClient from '@/lib/supabase/server';
import { OrBar } from '@/components/OrBar';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  // const { data } = await getUserSession();

  // const logoutAction = async () => {
  //   'use server';
  //   const supabase = await createSupabaseServerClient();
  //   await supabase.auth.signOut();
  // };
  const { userId } = auth();
  console.log('user id:', userId);

  if (userId) {
    redirect('/my-forms');
  }

  return (
    <>
      <div className="flex h-full flex-grow flex-col justify-between">
        <div className="px-[16px]">
          <Header>
            <TextLogo />
          </Header>
          <section className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <h2 className="text-center text-lg font-bold leading-7 text-black">Header 2</h2>
              <h3 className="text-center text-base font-normal leading-normal text-gray-dark">
                Subheader
              </h3>
            </div>
            <div className="flex justify-center">
              <Image src="/images/formImage.png" alt="Sample Form Image" width={343} height={232} />
            </div>
          </section>
        </div>

        <nav className="flex w-full flex-col gap-[12px] px-[16px]">
          {userId ? (
            <div className="h-[35px] w-[35px] rounded-full border-2">
              <UserButton afterSwitchSessionUrl="/" />
            </div>
          ) : (
            <></>
          )}
          <>
            <LinkButton variant="filled" href="/sign-in">
              Sign in
            </LinkButton>
            <OrBar />
            <LinkButton variant="white" href="/sign-up">
              Create an Account
            </LinkButton>
          </>
        </nav>
      </div>
    </>
  );
}
