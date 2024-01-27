'use client';
import useSWR from 'swr';
import Post from '@/app/components/post';

export default function PostsContainer ({
  page
}: { page: number }): JSX.Element {
  const { data, isLoading, error } = useSWR('/api/posts/feed?page=' + page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;
  return (
    <ul className='flex w-full flex-col items-start gap-4'>
      {data?.map((post: Post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </ul>
  );
}
