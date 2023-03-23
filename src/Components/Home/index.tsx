import { useEffect, useState } from 'react';
import CardComponent from '@/stylesComponents/Cards';
import useAxios from '@/utils/axios';

export default function HomeComponent(): JSX.Element {
  const [rooms, setRooms] = useState([]);

  const { data } = useAxios({ url: '/room/getRooms' });

  useEffect(() => {
    if (data) setRooms(data.data);
  }, [data]);

  return (
    <div className="flex space-x-4 justify-center flex-wrap items-center p-12 ">
      {rooms.map((item) => (
        <CardComponent key={item.id} data={item} />
      ))}
    </div>
  );
}
