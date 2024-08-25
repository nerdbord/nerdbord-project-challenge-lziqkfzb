import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();

  try {
    const {
      formName,
      fields,
      addressToSend,
    }: { formName: string; fields: string; addressToSend: string } = await request.json();

    const { data, error } = await supabase.rpc('create_form', {
      p_name: formName,
      p_body: fields,
      p_address_to_send: addressToSend,
    });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Błąd podczas tworzenia formularza:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
