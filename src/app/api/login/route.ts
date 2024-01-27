import { getClient } from '@/db';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';

export async function POST (request: Request): Promise<NextResponse> {
  const reqJSON: UserLogin = await request.json();

  const client = getClient();
  await client.connect();

  const logingUser = await client.query(
    'select id, password from public.users where username ilike $1',
    [reqJSON.username]
  );

  if (!logingUser.rowCount) {
    return NextResponse.json({ error: 'User does not exists' }, { status: 404 });
  }

  const logingUserHash: string = logingUser.rows[0].password;
  const hashMatch = await bcrypt.compare(reqJSON.password, logingUserHash);
  if (!hashMatch) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const logingUserID: string = logingUser.rows[0].id;

  await client.end();

  const response = NextResponse.json({ msg: 'Log in success' }, { status: 200 });

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(logingUserID)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  response.cookies.set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });

  return response;
}
