import { Header } from '@/components/Header';
import { LoginForm } from '../login-form';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import Link from 'next/link';
import { OrBar } from '@/components/OrBar';
import { SingInProviders } from '@/components/SingInProviders';
import { SignIn } from '@clerk/nextjs';
export default async function LoginPage() {
  return (
    <SignIn />

    // <>
    //   <div className="px-[16px]">
    //     <Header>
    //       <Link href="/">
    //         <ArrowLeft />
    //       </Link>
    //     </Header>
    //     <section className="flex flex-col gap-[16px]">
    //       <div className="flex flex-col gap-[8px]">
    //         <h2 className="text-center text-lg font-bold leading-7 text-black/80">Welcome back!</h2>
    //         <h3 className="text-center text-base font-normal leading-normal text-black/40">
    //           Enter your details to sign in
    //         </h3>
    //       </div>
    //       <LoginForm />
    //     </section>
    //   </div>
    //   <div className="px-[16px]">
    //     <OrBar />
    //   </div>
    //   <div className="px-[16px]">
    //     <SingInProviders />
    //   </div>
    // </>
  );
}
