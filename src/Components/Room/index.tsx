import { useCustomContext } from '@/Context';
import { IRoom } from '@/interface';
import { Table } from '@/stylesComponents';
import useAxios from '@/utils/axios';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { generateColumns } from './helpers';

type RoomProps = {
  id: string | string[];
};

function RoomComponent({ id }: RoomProps): JSX.Element {
  const { data } = useAxios({ url: `/room/getRoom/${id}` });
  const room: IRoom = data?.data;
  const { user } = useCustomContext();

  const router = useRouter();

  const redirect = (idUser: string) => {
    router.push(`/user/${idUser}`);
  };

  const rows = !!room ? room?.students : [];

  return (
    <div className="p-12 flex space-x-8 ">
      <Paper className="w-1/3 p-4">
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
      </Paper>
      <Paper className="w-2/3 p-4">
        <Typography
          variant="h5"
          align="center"
          className="underline decoration-orange-400"
        >
          Students
        </Typography>
        <Table
          height="60vh"
          rows={rows}
          columns={generateColumns(user?.rol, redirect)}
        />
      </Paper>
    </div>
  );
}

export default RoomComponent;
