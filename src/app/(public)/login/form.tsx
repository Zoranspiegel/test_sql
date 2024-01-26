'use client';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

const initialUserState = {
  username: '',
  password: ''
};

export default function LoginForm (): JSX.Element {
  const [userState, setUserState] = useState<UserLogin>(initialUserState);

  function handleChange (e: ChangeEvent<HTMLInputElement>): void {
    setUserState(prevState => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();
    alert(`USER: ${userState.username}\nPASS: ${userState.password}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-full max-w-xs justify-center items-center rounded-lg bg-gray-800 py-4 gap-4'
    >
      <div className='flex flex-col'>
        <label>Username</label>
        <input
          type='text'
          id='username'
          value={userState.username}
          placeholder='Username...'
          onChange={handleChange}
          className='rounded-lg bg-gray-200 py-2 px-4 text-black'
        />
      </div>
      <div className='flex flex-col'>
        <label>Password</label>
        <input
          type='password'
          id='password'
          value={userState.password}
          placeholder='Password...'
          onChange={handleChange}
          className='rounded-lg bg-gray-200 py-2 px-4 text-black'
        />
      </div>
      <button
        type='submit'
        className='rounded-lg bg-gray-600 px-4 py-2'
      >Log In</button>
    </form>
  );
}
