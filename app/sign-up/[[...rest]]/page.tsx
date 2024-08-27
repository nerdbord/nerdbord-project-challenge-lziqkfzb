import { Header } from '@/components/Header';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <>
      <div className="z px-[16px]">
        <Header>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Header>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'border-0 shadow-none w-full  max-w-[100vw]  flex flex-col justify-between',
            main: 'flex flex-col-reverse',
            footer: 'bg-none  sm:max-w-[450px] fixed bottom-0 left-0 right-0 bg-white mx-auto z-50',
            socialButtons: 'flex flex-col-reverse gap-[16px]',
            formFieldRow__name: 'flex flex-col',
            card: 'p-[16px] pb-[170px]',
            button: 'h-[44px]',
            input: 'h-[44px]',
          },
        }}
      />
    </>
  );
}
