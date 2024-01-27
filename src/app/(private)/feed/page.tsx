export default function Feed (): JSX.Element {
  return (
    <div>
      FEED
      <div>{process.env.JWT_SECRET}</div>
    </div>
  );
}
