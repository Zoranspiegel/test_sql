import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar (): JSX.Element {
  const pathname = usePathname();
  return (
    <nav className='flex w-full justify-around items-center rounded-lg bg-gray-800 py-4 px-6'>
      <Link
        href='/feed'
        className={pathname === '/feed' ? 'text-white' : ''}
      >
        Feed
      </Link>
      <Link
        href='/profile'
        className={pathname === '/profile' ? 'text-white' : ''}
      >
        Profile
      </Link>
      <Link
        href='/following'
        className={pathname === '/following' ? 'text-white' : ''}
      >
        Following
      </Link>
      <Link
        href='/followers'
        className={pathname === '/followers' ? 'text-white' : ''}
      >
        Followers
      </Link>
    </nav>
  );
}
