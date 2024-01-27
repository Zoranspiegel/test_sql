export default function Header (): JSX.Element {
  return (
    <header
      className='flex w-full justify-between items-center rounded-lg bg-gray-800 py-4 px-6'
    >
      <div>
        <h1>TestSQL</h1>
      </div>
      <div>USER</div>
    </header>
  );
}
