/* eslint-disable @typescript-eslint/no-unused-vars */
interface UserSignup {
  username: string
  password: string
  confirmPassword: string
}

type UserLogin = Omit<UserSignup, 'confirmPassword'>;

interface UserProfile {
  id: string
  username: string
  avatar: string
}

interface Post {
  id: string
  user_id: string
  username: string
  avatar: string
  content: string
  created_at: string
}
