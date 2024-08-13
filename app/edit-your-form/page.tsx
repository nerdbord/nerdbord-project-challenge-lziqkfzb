import { FormGeneratedByUser } from '@/components/FormGeneratedByUser';
import { Header } from '@/components/Header';
import { cookies } from 'next/headers';

export default async function Page() {
  const formJSON = cookies().get('formJSON')?.value;
  if (!formJSON) {
    return <h2>Halo, coś się zepsuło i mnie nie widać</h2>; //TODO:
  }

  const { fields, formName } = JSON.parse(formJSON);

  return (
    <>
      <Header />
      <section className="min-h-screen bg-ct-blue-600 py-20">
        <div className="mx-auto flex min-h-[20rem] max-w-4xl flex-col items-center justify-center rounded-md bg-ct-dark-100">
          <FormGeneratedByUser formFields={fields} formName={formName} />
        </div>
      </section>
    </>
  );
}
