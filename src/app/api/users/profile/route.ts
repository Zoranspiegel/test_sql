import { getJWTPayload } from '@/app/util/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();
  if (!jwtPayload) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const client = getClient();
  await client.connect();

  const loggedUser = await client.query(
    'select id, username, avatar, is_admin from public.users where id = $1',
    [jwtPayload?.sub]
  );

  await client.end();
  const response = NextResponse.json(loggedUser.rows[0], { status: 200 });
  return response;
}
