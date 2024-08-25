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

  // if (data.session) {
  //   redirect('/my-forms');
  // }

  const { userId } = auth();
  console.log('user id:', userId);

  return (
    <>
      <div className="px-[16px]">
        <Header>
          <TextLogo />
        </Header>
        <section className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-center text-lg font-bold leading-7 text-black/80">Header 2</h2>
            <h3 className="text-center text-base font-normal leading-normal text-black/40">
              Subheader
            </h3>
          </div>
          <Image src="/images/formImage.png" alt="Sample Form Image" width={343} height={232} />
        </section>
      </div>
      <div>
        {userId ? (
          <div className="h-[35px] w-[35px] rounded-full border-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <Link href="/sign-in" className="rounded-lg border-2 px-4 py-2 font-bold">
            Log In
          </Link>
        )}
      </div>
      {/* <nav className="flex w-full flex-col gap-[12px] px-[16px]">
        {!data.session ? (
          <LinkButton variant="filled" href="/login">
            Sign in
          </LinkButton>
        ) : (
          <LinkButton variant="filled" href="/profile">
            Profile
          </LinkButton>
        )}
        <OrBar />
        {!data.session ? (
          <LinkButton variant="white" href="/register">
            Create an Account
          </LinkButton>
        ) : (
          <form action={logoutAction} className="flex w-full">
            <Button variant="white" type="submit">
              Logout
            </Button>
          </form>
        )}
      </nav> */}
    </>
  );
}
