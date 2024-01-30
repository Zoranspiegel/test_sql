'use client';
import { useState } from 'react';
import ProfileForm from './form';
import PostsContainer from '@/app/components/posts-container';

export default function Profile (): JSX.Element {
  const [pageState, setPageState] = useState<number>(1);

  const pages = [];
  for (let i = 0; i < pageState; i++) {
    pages.push(<PostsContainer page={i} endpoint='/api/posts' key={i}/>);
  }

  return (
    <div className='flex flex-col justify-start items-start w-full gap-4'>
      <ProfileForm />
      {pages}
      <button
        onClick={() => { setPageState(pageState + 1); }}
        className='rounded-lg bg-gray-600 py-2 px-4 border-[#5ac53f] border-2'
      >
        Load more...
      </button>
    </div>
  );
}
