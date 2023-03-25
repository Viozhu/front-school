import { useCustomContext } from '@/Context';
import { IRoom } from '@/interface';
import { useState } from 'react';
import { Table } from '@/stylesComponents';
import useAxios from '@/utils/axios';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import EditModal from '../Modals/EditModal';
import { generateColumns } from './helpers';
import AddOrEditRoom from '../Modals/AddRoom';
import DeleteRoom from '../Modals/DeleteRoom';
import AddStudents from '../Modals/AddStudents';
import DeleteStudents from '../Modals/DeleteStudents';

type RoomProps = {
  id: string | string[];
};

function RoomComponent({ id }: RoomProps): JSX.Element {
  const { data } = useAxios(`/room/getRoom/${id}`);
  const room: IRoom = data?.data;
  const { user } = useCustomContext();
  const [modals, setModals] = useState({
    edit: false,
    deleteStudents: false,
    user: null,
    editRoom: false,
    deleteRoom: false,
    addStudents: false,
  });

  const router = useRouter();

  const redirect = (idUser: string) => {
    router.push(`/user/${idUser}`);
  };

  const rows = !!room ? room?.students : [];

  const openModals = (type: 'edit' | 'delete', userData) => {
    setModals({ ...modals, [type]: true, user: userData });
  };

  return (
    <div className=" p-2 lg:p-12 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8  ">
      <Paper className="w-full mt-4 lg:mt-0 lg:w-1/3 p-4 flex flex-col h-full">
        <Typography variant="h5" align="center">
          Room #{room?.id}
        </Typography>
        <Divider />
        <List className="space-y-3">
          <ListItem>
            <ListItemText primary="Name:" />
            {room?.name}
          </ListItem>

          <ListItem>
            <ListItemText primary="Day:" />
            {room?.day}
          </ListItem>
          <ListItem>
            <ListItemText primary="Time:" />
            {room?.time} hs
          </ListItem>
          <ListItem>
            <ListItemText primary="Capacity:" />
            {room?.capacity} students
          </ListItem>

          <ListItem>
            <ListItemText primary="Teacher:" />
            Rudof Alfonso
          </ListItem>
          <ListItem>
            <ListItemText primary="Content:" />
          </ListItem>
          <ListItem className="text-sm">{room?.content}</ListItem>
        </List>
        <div className="flex  w-full h-12 items-end justify-center  space-x-12 mb-4">
          {user?.rol === 'ADMIN' && (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setModals({ ...modals, editRoom: true })}
              >
                Edit Room
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setModals({ ...modals, deleteRoom: true })}
              >
                Delete Room
              </Button>
            </>
          )}
        </div>
      </Paper>
      <Paper className="w-full lg:w-2/3 p-4">
        <div className="flex w-full flex-col lg:flex-row justify-center lg:justify-between lg:mx-4 mx-0">
          <Typography
            variant="h5"
            align="center"
            className="underline decoration-orange-400"
          >
            Students
          </Typography>
          {user?.rol === 'ADMIN' && (
            <div className=" flex justify-center mt-2 lg:mt-0 space-x-5 lg:mr-12">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setModals({ ...modals, addStudents: true })}
              >
                Add Students
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setModals({ ...modals, deleteStudents: true })}
              >
                Delete Students
              </Button>
            </div>
          )}
        </div>

        <Table
          height="60vh"
          rows={rows}
          columns={generateColumns(user?.rol, redirect, openModals)}
        />
      </Paper>
      {modals.edit && (
        <EditModal
          open={modals.edit}
          onClose={() => setModals({ ...modals, edit: false })}
          user={modals.user}
        />
      )}
      {modals.deleteStudents && (
        <DeleteStudents
          open={modals.deleteStudents}
          onClose={() => setModals({ ...modals, deleteStudents: false })}
          room={room}
        />
      )}
      {modals.editRoom && (
        <AddOrEditRoom
          open={modals.editRoom}
          type="update"
          onClose={() => setModals({ ...modals, editRoom: false })}
          room={room}
        />
      )}
      {modals.deleteRoom && (
        <DeleteRoom
          open={modals.deleteRoom}
          onClose={() => setModals({ ...modals, deleteRoom: false })}
          room={room}
        />
      )}
      {modals.addStudents && (
        <AddStudents
          open={modals.addStudents}
          onClose={() => setModals({ ...modals, addStudents: false })}
          room={room}
        />
      )}
    </div>
  );
}

export default RoomComponent;
