'use client';
import useSWR from 'swr';
import Post from './post';

export default function PostsContainer ({
  page,
  endpoint,
  username
}: {
  page: number
  endpoint: string
  username?: string
}): JSX.Element {
  const { data, isLoading, error } = useSWR(`${endpoint}?page=${page}${username ? `&username=${username}` : ''}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <ul className='flex w-full flex-col items-start'>
      {data?.map((post: Post) => (
        <li key={post.id} className='mb-4'>
          <Post post={post}/>
        </li>
      ))}
    </ul>
  );
}
