import { getClient } from '@/db';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function loadFakeAdmin (username: string, password: string): Promise<void> {
  if (!username || !password) {
    throw new Error('MISSING FIELDS');
  }

  const client = getClient();
  await client.connect();

  try {
    await client.query('begin');

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await client.query(
      'insert into public.users (username, password, avatar, is_admin) values ($1, $2, $3, $4)',
      [username, hash, faker.image.avatar(), true]
    );

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const username = process.argv[2];
const password = process.argv[3];

loadFakeAdmin(username, password)
  .catch(error => { console.error(error); });
