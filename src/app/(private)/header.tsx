'use client';
import useSWR from 'swr';
import User from '../components/user';

export default function Header (): JSX.Element {
  const { data, error, isLoading } = useSWR('/api/users/profile');

  if (isLoading) {
    return (
      <div className='flex w-full justify-between items-center rounded-lg bg-gray-800 py-4 px-6'>
        <h1 className='text-2xl font-bold'>TestSQL</h1>
        <div>Loading...</div>
      </div>
    );
  };
  if (error) {
    return (
      <div className='flex w-full justify-between items-center rounded-lg bg-gray-800 py-4 px-6'>
        <h1 className='text-2xl font-bold'>TestSQL</h1>
        <div>ERROR</div>
      </div>
    );
  }

  return (
    <header
      className='flex w-full justify-between items-center rounded-lg bg-gray-800 py-4 px-6'
    >
      <div>
        <h1 className='text-2xl font-bold'>TestSQL</h1>
      </div>
      <User data={data} href='account'/>
    </header>
  );
}
