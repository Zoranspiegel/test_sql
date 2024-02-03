'use client';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { mutate } from 'swr';

export default function ProfileForm (): JSX.Element {
  const [contentState, setContentState] = useState<string>('');

  function handleChange (e: ChangeEvent<HTMLTextAreaElement>): void {
    setContentState(e.target.value);
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify({ content: contentState })
    });
    if (res.ok) {
      setContentState('');
      mutate((key: string) => key.startsWith('/api/posts'))
        .catch(error => { console.error(error); });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-full justify-start items-start gap-2 mb-6'
    >
      <textarea
        value={contentState}
        onChange={handleChange}
        placeholder='What is happening?'
        rows={4}
        className='rounded-lg w-full max-w-xs bg-gray-700 p-2 resize-none'
      />
      <button
        type='submit'
        className='bg-gray-600 rounded-lg px-4 py-2 border-[#5ac53f] border-2'
      >Post</button>
    </form>
  );
}
