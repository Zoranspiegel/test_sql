export default function PublicLayout ({
  children
}: { children: React.ReactNode }): JSX.Element {
  return (
    <main className='flex min-h-screen justify-center items-center'>{children}</main>
  );
}
