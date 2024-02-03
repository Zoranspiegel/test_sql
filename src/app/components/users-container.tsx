'use client';
import useSWR from 'swr';
import User from './user';

export default function UsersContainer ({
  page,
  url
}: {
  page: number
  url: string
}): JSX.Element {
  const { data, isLoading, error } = useSWR(`${url}?page=${page}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;
  return (
    <ul className='flex flex-col w-full'>
      {data?.map((user: UserProfile) => (
        <li
          key={user.id}
          className='mb-6'
        >
          <User data={user}/>
        </li>
      ))}
    </ul>
  );
}
