import { getJWTPayload } from '@/app/util/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) ?? 0;
  const limit = 10;
  const offset = page * limit;

  const jwtPayload = await getJWTPayload();

  const username = searchParams.get('username');

  const client = getClient();
  await client.connect();

  const data = [];
  if (username) {
    const postsRes = await client.query(
      `select p.*, u.username, u.avatar from public.posts p 
      inner join public.users u on p.user_id = u.id 
      where u.username ilike $1 
      order by created_at desc limit $2 offset $3`,
      [username, limit, offset]
    );
    data.push(...postsRes.rows);
  } else {
    const postsRes = await client.query(
      `select p.*, u.username, u.avatar from public.posts p 
      inner join public.users u on p.user_id = u.id 
      where p.user_id = $1 
      order by created_at desc limit $2 offset $3`,
      [jwtPayload?.sub, limit, offset]
    );
    data.push(...postsRes.rows);
  }

  await client.end();

  return NextResponse.json(data, { status: 200 });
}

export async function POST (request: Request): Promise<NextResponse> {
  const { content } = await request.json();

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  let data;
  try {
    await client.query('begin');

    const res = await client.query(
      'insert into public.posts (user_id, content) values ($1, $2) returning *',
      [jwtPayload?.sub, content]
    );

    data = res.rows;

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.end();
  }

  const response = NextResponse.json({ msg: 'Post successfully created', data }, { status: 201 });
  return response;
}
