import { useCustomContext } from '@/Context';
import CardComponent from '@/stylesComponents/Cards';
import useAxios from '@/utils/axios';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddOrEditRoom from '../Modals/AddRoom';

export default function HomeComponent(): JSX.Element {
  const [rooms, setRooms] = useState([]);
  const [modals, setModals] = useState({
    addOrEditRoom: false,
  });
  const { user } = useCustomContext();
  const { data } = useAxios('/room/getRooms');

  useEffect(() => {
    if (data) setRooms(data.data);
  }, [data]);

  return (
    <div className="mt-8">
      <Typography
        variant="h4"
        className="m-4  text-white underline decoration-orange-500"
        align="center"
      >
        Rooms List
      </Typography>
      <Typography variant="body1" align="center" className="text-white ">
        Here you can see all the rooms registered in the system
      </Typography>
      {user?.rol === 'ADMIN' && (
        <div className="w-full flex justify-center mt-4">
          <Button
            variant="contained"
            color="primary"
            className="bg-orange-500"
            onClick={() => setModals({ ...modals, addOrEditRoom: true })}
          >
            Add Room
          </Button>{' '}
        </div>
      )}
      <div className="flex space-x-4 justify-center flex-wrap items-center p-8 ">
        {rooms.map((item) => (
          <CardComponent key={item.id} data={item} />
        ))}
      </div>
      {modals.addOrEditRoom && (
        <AddOrEditRoom
          open={modals.addOrEditRoom}
          type="create"
          onClose={() => setModals({ ...modals, addOrEditRoom: false })}
          room={null}
        />
      )}
    </div>
  );
}
