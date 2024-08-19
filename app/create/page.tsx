import { Header } from '@/components/Header';
import { PromptInput } from '@/app/create/PromptInput';
import { Logo } from '@/components/icons/Logo';

export default async function Page() {
  return (
    <>
      <div className="px-[16px]">
        <Header>
          <Logo />
        </Header>
        <section className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-center text-lg font-bold leading-7 text-black/80">
              AI form builder
            </h2>
            <h3 className="text-center text-base font-normal leading-normal text-black/40">
              Use chat to create you first form
            </h3>
          </div>
        </section>
      </div>
      <PromptInput />
    </>
  );
}
