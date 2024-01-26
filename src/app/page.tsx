import Link from 'next/link';

export default function Home (): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col justify-center items-center max-w-xs w-full rounded-lg bg-gray-800 p-4 gap-4'>
        <h1 className='text-2xl'>TestSQL</h1>
        <Link
          href='/login'
          className='bg-gray-600 w-full rounded-lg py-2 text-center'
        >Log In</Link>
        <Link
          href='/signup'
          className='bg-gray-600 w-full rounded-lg py-2 text-center'
        >Sign Up</Link>
      </div>
    </main>
  );
}
