import { Header } from '@/components/Header';
import { RegisterForm } from './register-form';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import Link from 'next/link';
import { OrBar } from '@/components/OrBar';
import { SingInProviders } from '@/components/SingInProviders';

export default async function LoginPage() {
  return (
    <>
      <div>
        <Header>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Header>
        <section className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-center text-lg font-bold leading-7 text-black/80">
              Create an account
            </h2>
            <h3 className="text-center text-base font-normal leading-normal text-black/40">
              Sign up with email to create you first form
            </h3>
          </div>
          <RegisterForm />
         
        </section>
      </div>
      <OrBar />
      <SingInProviders />
    </>
  );
}
