import { cookies } from 'next/headers';
import { type JWTPayload, jwtVerify } from 'jose';

export async function getJWTPayload (): Promise<JWTPayload | undefined> {
  const cookieStore = cookies();
  const cookie = cookieStore.get('jwt-token');
  if (!cookie?.value) return;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(cookie?.value, secret);
  return payload;
}
