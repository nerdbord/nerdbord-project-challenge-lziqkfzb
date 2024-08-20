import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  try {
    console.log('wysłano usuniecie');

    const { formId }: { formId: string } = await request.json();
    console.log(formId);

    const { data, error } = await supabase.rpc('delete_form_by_id', {
      form_id: formId,
    });

    if (error) throw error;
    console.log(data, error);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Błąd podczas usuwania formularza:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
