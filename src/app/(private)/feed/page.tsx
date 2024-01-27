'use client';
import PostsContainer from './posts-container';
import { useState } from 'react';

export default function Feed (): JSX.Element {
  const [pageState, setPageState] = useState<number>(1);

  const posts = [];
  for (let i = 0; i < pageState; i++) {
    posts.push(<PostsContainer key={i} page={i}/>);
  }

  return (
    <div className='flex flex-col w-full justify-start items-center'>
      {posts}
      <button
        onClick={() => { setPageState(pageState + 1); }}
        className='rounded-lg bg-gray-600 py-2 px-4'
      >
        Load more...
      </button>
    </div>
  );
}
