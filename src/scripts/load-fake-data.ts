import { getClient } from '@/db';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function loadFakeData (numUsers: number): Promise<void> {
  const client = getClient();
  await client.connect();

  try {
    await client.query('begin');

    for (let i = 0; i < numUsers; i++) {
      const saltRounds = 10;
      const password = 'password12345';
      const hash = bcrypt.hashSync(password, saltRounds);
      await client.query(
        'insert into public.users (username, password, avatar) values ($1, $2, $3)',
        [faker.internet.userName(), hash, faker.image.avatar()]
      );
    }

    const newUsers = await client.query(
      'select id from public.users order by created_at desc limit $1',
      [numUsers]
    );

    for (const row of newUsers.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 40) + 10; i++) {
        const post = Math.random() < 0.5 ? faker.lorem.sentence() : faker.lorem.paragraph();
        await client.query(
          'insert into public.posts (user_id, content) values ($1, $2)',
          [row.id, post]
        );
      }
    }

    for (const row1 of newUsers.rows) {
      for (const row2 of newUsers.rows) {
        if (row1.id !== row2.id) {
          if (Math.random() < 0.5) {
            await client.query(
              'insert into public.follows (user_id, follower_id) values ($1, $2)',
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const numUsers = Number(process.argv[2]) || 10;
loadFakeData(numUsers)
  .catch(error => { console.error(error); });
