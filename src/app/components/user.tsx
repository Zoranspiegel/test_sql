import Image from 'next/image';
import Link from 'next/link';

export default function User ({
  data, href
}: { data: UserProfile, href?: string }): JSX.Element {
  return (
    <div>
      <Link href={`/${href ?? data.username}`} className='flex items-center gap-2'>
        <div>
          {data.avatar && (
            <Image
              src={data.avatar}
              alt={data.username}
              width={50}
              height={50}
              className='rounded-full'
            />
          )}
          {!data.avatar && (
            <div className='rounded-full bg-gray-600 w-[50px} h-[50px]'></div>
          )}
        </div>
        <div>
          {data.username}
        </div>
      </Link>
    </div>
  );
}
