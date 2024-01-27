'use client';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const initialUserState = {
  username: '',
  password: '',
  confirmPassword: ''
};

export default function SignupForm (): JSX.Element {
  const router = useRouter();
  const [userState, setUserState] = useState<UserSignup>(initialUserState);
  const [errorsState, setErrorsState] = useState<string[]>([]);

  function handleChange (e: ChangeEvent<HTMLInputElement>): void {
    setUserState(prevState => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();

    setErrorsState([]);
    if (userState.password !== userState.confirmPassword) {
      setErrorsState(prevState => [...prevState, 'Passwords do not match']);
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'post',
      body: JSON.stringify(userState)
    });

    if (!res.ok) {
      const resJSON = await res.json();
      setErrorsState(prevState => [...prevState, resJSON.error]);
    } else {
      router.push('/feed');
    }
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
      <div className='flex flex-col'>
        <label>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          value={userState.confirmPassword}
          placeholder='Confirm...'
          onChange={handleChange}
          className='rounded-lg bg-gray-200 py-2 px-4 text-black'
        />
      </div>
      {errorsState.length > 0 && (
        <ul>
          {errorsState?.map(error => (
            <li
              key={error}
              className='list-disc text-sm text-red-600'
            >
              {error}
            </li>
          ))}
        </ul>
      )}
      <button
        type='submit'
        className='rounded-lg bg-gray-600 px-4 py-2'
      >Sign Up</button>
    </form>
  );
}
