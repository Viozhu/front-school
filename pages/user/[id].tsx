import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

function User(): JSX.Element {
  const router = useRouter();
  const { id }: ParsedUrlQuery = router.query;

  return <div>{id}</div>;
}

export default User;
