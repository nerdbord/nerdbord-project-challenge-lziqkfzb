import { NextResponse } from 'next/server';

import { deleteOldTemporaryForms } from '@/lib/supabase/supabaseRequests';

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.log('Unauthorized CRON JOB');
    return new NextResponse('Unauthorized', { status: 401 });
  }
  
  const error = await deleteOldTemporaryForms();

  if (error) {
    console.log('Error in try deleteOldTemporaryForms', error);

    NextResponse.json({ ok: false });
  }
  console.log('usunieto stare formy');

  return NextResponse.json({ ok: true });
}
