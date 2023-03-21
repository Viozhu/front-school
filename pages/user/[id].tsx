import { useRouter } from 'next/router';

type Props = {};

function User({}: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
}

export default User;
