import { useEffect, useState } from 'react';
import CardComponent from '@/stylesComponents/Cards';
import axios from 'axios';

export default function HomeComponent(): JSX.Element {
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    const { data } = await axios('http://localhost:4001/room/getRooms');
    setRooms(data.data);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="flex space-x-4 justify-center flex-wrap items-center p-12 ">
      {rooms.map((item) => (
        <CardComponent key={item.id} data={item} />
      ))}
    </div>
  );
}
