import { Header } from '@/components/Header';
import { LoginForm } from '../login-form';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import Link from 'next/link';
import { OrBar } from '@/components/OrBar';
import { SignIn } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';

export default async function LoginPage() {
  return (
    <>
      <div className="flex h-full w-full flex-grow flex-col px-[16px]">
        <Header>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Header>
        <div className="flex h-full w-full flex-grow flex-col items-center justify-around">
          <section className="flex w-full flex-col gap-[16px] rounded-r-none">
            <div className="flex flex-col gap-[8px]">
              <h2 className="text-center text-lg font-bold leading-7 text-black/80">
                Welcome back!
              </h2>
              <h3 className="rounded-b-none text-center text-base font-normal leading-normal text-black/40">
                Enter your details to sign in
              </h3>
            </div>
            <LoginForm />
          </section>
          <OrBar />
          <div className="flex flex-col gap-[12px]">
            <SignIn
              appearance={{
                baseTheme: neobrutalism,

                elements: {
                  header: 'hidden',
                  footer: 'hidden',
                  dividerRow: 'hidden',
                  form: 'hidden',
                  rootBox: 'border-0 shadow-none',
                  cardBox: 'border-0 shadow-none',
                  socialButtons: 'flex flex-col-reverse gap-[16px]',
                  card: 'p-0',
                  button: 'h-[44px] rounded-[8px] border border-[#D0D5DD]   shadow-none',
                },
              }}
            />
            <p className="text-center text-sm font-normal text-[#9A98A4]">
              {'By signing in I agree to '}
              <Link href={'/policy'}>
                <span className="font-medium underline">Privacy Policy</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

//   </div>
//   <div className="px-[16px]">
//
//   </div>
//   <div className="px-[16px]">
//     <SingInProviders />
//
