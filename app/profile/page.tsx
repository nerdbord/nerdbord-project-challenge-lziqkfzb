import { Header } from '@/components/Header';
import getUserSession from '@/lib/getUserSession';
import { redirect } from 'next/navigation';
import createSupabaseServerClient from '@/lib/supabase/server';
import { Button } from '@/components/Button';
export default async function ProfilePage() {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    return redirect('/login');
  }

  const logoutAction = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  const user = session.user;

  return (
    <>
      <Header />
      <section className="min-h-screen bg-ct-blue-600 pt-20">
        <div className="mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md bg-ct-dark-100">
          <div>
            <p className="mb-3 text-center text-5xl font-semibold">Profile Page</p>
            <div className="mt-8">
              <p className="mb-3">Id: {user.id}</p>
              <p className="mb-3">Role: {user.role}</p>
              <p className="mb-3">Email: {user.email}</p>
              <p className="mb-3">Provider: {user.app_metadata['provider']}</p>
              <p className="mb-3">Created At: {user.created_at}</p>
            </div>
          </div>
        </div>{' '}
        <form action={logoutAction} className="mt-7 flex w-full">
          <Button variant="white" type="submit">
            Logout
          </Button>
        </form>
      </section>
    </>
  );
}
