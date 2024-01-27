import Link from 'next/link';
import Image from 'next/image';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'America/Bogota'
};

export default function Post ({
  post
}: { post: Post }): JSX.Element {
  return (
    <li
      className='flex gap-4'
    >
      <div>
        <Link href={`/${post.username}`}>
          {post.avatar && (
            <Image
              src={post.avatar}
              alt={post.username}
              width={50}
              height={50}
              className='rounded-full'
            />
          )}
          {!post.avatar && (
            <div className='w-[50px] h-[50px] rounded-full bg-gray-600'></div>
          )}
        </Link>
      </div>
      <div className='flex flex-col max-w-xs'>
        <Link
          href={`/${post.username}`}
          className='font-bold'
        >{post.username}</Link>
        <div className='text-gray-400'>{new Date(post.created_at).toLocaleDateString('es-mx', dateOptions)}</div>
        <div className='mt-2'>{post.content}</div>
      </div>
    </li>
  );
}
