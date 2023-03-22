import UserComponent from '@/Components/User';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

function User(): JSX.Element {
  const router = useRouter();
  const { id }: ParsedUrlQuery = router.query;

  return <UserComponent id={id} />;
}

export default User;
