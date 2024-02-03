'use client';
import { useState } from 'react';

export default function Following (): JSX.Element {
  const [pageState, setPageState] = useState<number>(1);

  const userPages = [];
  for (let i = 0; i < pageState; i++) {
    userPages.push();
  }
  return (
    <div className='flex flex-col w-full justify-start items-center'>
      {userPages}
      <button
        onClick={() => { setPageState(pageState + 1); }}
        className='rounded-lg bg-gray-600 py-2 px-4 border-[#5ac53f] border-2'
      >
        Load more...
      </button>
    </div>
  );
}
