/* eslint-disable @typescript-eslint/no-unused-vars */
interface UserSignup {
  username: string
  password: string
  confirmPassword: string
}

type UserLogin = Omit<UserSignup, 'confirmPassword'>;
