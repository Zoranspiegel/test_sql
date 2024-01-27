'use client';
import Footer from './footer';
import Header from './header';
import NavBar from './navbar';
import { SWRConfig } from 'swr';
import { fetcher } from '@/app/util/fetcher';

export default function PrivateLayout ({
  children
}: { children: React.ReactNode }): JSX.Element {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className='flex flex-col min-h-screen max-w-md m-auto justify-start items-center gap-2 py-2 box-border'>
        <Header />
        <NavBar />
        <main className='flex flex-grow w-full rounded-lg bg-gray-800 py-4 px-6'>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
