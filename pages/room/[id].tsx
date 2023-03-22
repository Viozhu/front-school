import RoomComponent from '@/Components/Room';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

function Room(): JSX.Element {
  const router = useRouter();
  const { id }: ParsedUrlQuery = router.query;

  return <RoomComponent id={id} />;
}

export default Room;
