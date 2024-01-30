import { NextResponse } from 'next/server';
import { getJWTPayload } from '@/app/util/auth';
import { getClient } from '@/db';

export async function GET (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const postRes = await client.query(
    `select p.*, u.username, u.avatar from public.posts p 
    inner join public.users u on p.user_id = u.id 
    where p.user_id = $1 and p.id = $2`,
    [jwtPayload?.sub, params.id]
  );

  await client.end();

  if (!postRes.rowCount) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json(postRes.rows, { status: 200 });
  return response;
}

export async function DELETE (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const deletePostRes = await client.query(
    'delete from public.posts where user_id = $1 and id = $2',
    [jwtPayload?.sub, params.id]
  );

  await client.end();

  if (!deletePostRes.rowCount) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json({ msg: 'Post successfully deleted' }, { status: 200 });
  return response;
}

export async function PATCH (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { content } = await request.json();

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const patchedPostRes = await client.query(
    'update public.posts set content = $1 where user_id = $2 and id = $3',
    [content, jwtPayload?.sub, params.id]
  );

  await client.end();

  if (!patchedPostRes.rowCount) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json({ msg: 'Post successfully edited' }, { status: 200 });
  return response;
}
