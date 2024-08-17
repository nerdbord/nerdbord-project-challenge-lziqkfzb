import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createSupabaseServerClient();

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
    .from('forms')
    .select()
    .eq('created_by', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true, data });

} catch (error: any) {
    console.error('Błąd podczas pobierania formularza:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}