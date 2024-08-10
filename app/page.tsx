import { Header } from '@/components/Header';
import { HomeInput } from '@/components/HomeInput';

export default async function Home() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-ct-blue-600 pt-20">
        <div className="mx-auto flex h-[20rem] max-w-4xl flex-col items-center justify-center rounded-md bg-ct-dark-100">
          <HomeInput />
        </div>
      </section>
    </>
  );
}
