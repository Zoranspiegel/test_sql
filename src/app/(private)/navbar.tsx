import Link from 'next/link';

export default function NavBar (): JSX.Element {
  return (
    <nav className='flex w-full justify-around items-center rounded-lg bg-gray-800 py-4 px-6'>
      <Link
        href='/feed'
      >
        Feed
      </Link>
      <Link
        href='/'
      >
        X
      </Link>
      <Link
        href='/'
      >
        X
      </Link>
      <Link
        href='/'
      >
        X
      </Link>
    </nav>
  );
}
