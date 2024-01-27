import { getClient } from '@/db';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';

export async function POST (request: Request): Promise<NextResponse> {
  const reqJSON: UserSignup = await request.json();

  const client = getClient();
  await client.connect();

  const userExists = await client.query(
    'select id from public.users where username ilike $1',
    [reqJSON.username]
  );

  if (userExists.rowCount) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
  }

  const saltRounds = 10;
  const password = reqJSON.password;
  const hash = await bcrypt.hash(password, saltRounds);
  await client.query(
    'insert into public.users (username, password) values ($1, $2)',
    [reqJSON.username, hash]
  );

  const newUser = await client.query(
    'select id from public.users where username ilike $1',
    [reqJSON.username]
  );
  const newUserID: string = newUser.rows[0].id;

  await client.end();

  const response = NextResponse.json({ msg: 'Sign up success' }, { status: 201 });

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(newUserID)
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
