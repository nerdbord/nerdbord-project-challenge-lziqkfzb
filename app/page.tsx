import { Header } from '@/components/Header';
import { TextLogo } from '@/components/TextLogo';
import Image from 'next/image';
import { LinkButton } from '@/components/LinkButton';
import { Button } from '@/components/Button';
import getUserSession from '@/lib/getUserSession';
import createSupabaseServerClient from '@/lib/supabase/server';
import { OrBar } from '@/components/OrBar';

export default async function Home() {
  const { data } = await getUserSession();

  const logoutAction = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  return (
    <>
      <div>
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
      <nav className="flex w-full flex-col gap-[12px]">
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
      </nav>
    </>
  );
}
