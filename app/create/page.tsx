import { Header } from '@/components/Header';
import { PromptInput } from '@/app/create/PromptInput';
import { Logo } from '@/components/icons/Logo';
import Link from 'next/link';
import { Form } from '@/components/icons/Form';
import { Tool } from '@/components/icons/Tool';
import { ProfileButton } from '@/components/ProfileButton';

export default async function Page() {
  return (
    <>
      <div className="flex flex-grow flex-col justify-between">
        <div className="px-[16px]">
          <Header>
            <Logo />
          </Header>
          <section className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <h2 className="text-center text-lg font-bold leading-7 text-black">
                AI form builder
              </h2>
              <h3 className="text-center text-base font-normal leading-normal text-gray-dark">
                Use chat to create you first form
              </h3>
            </div>
          </section>
        </div>
        <PromptInput />
        <nav>
          <ul className="flex justify-between border-t border-gray px-[48px] py-[9px]">
            <li>
              <Link href="/my-forms" className="flex flex-col items-center">
                <Form isGrayed={true} />
                <div className="text- text-center text-xs font-medium leading-tight">Forms</div>
              </Link>
            </li>
            <li>
              <Link href="/create" className="flex flex-col items-center">
                <Tool />
                <div className="text-center text-xs font-bold leading-[18px] text-black">
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
