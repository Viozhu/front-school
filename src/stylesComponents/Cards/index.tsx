import { useState } from 'react';

// eslint-disable-next-line import/no-cycle
import AddOrEditRoom from '@/Components/Modals/AddRoom';
import { useCustomContext } from '@/Context';
import { DAY, IRoom } from '@/interface';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import DeleteRoom from '@/Components/Modals/DeleteRoom';

interface CardComponentProps {
  data: IRoom;
}

export default function CardComponent({
  data,
}: CardComponentProps): JSX.Element {
  const router = useRouter();
  const { user } = useCustomContext();

  const [modals, setModals] = useState({
    edit: false,
    delete: false,
  });

  const fistLetterMayus = (word: string | DAY) => {
    const day = word as string;
    return day.charAt(0).toUpperCase() + day.slice(1).toLocaleLowerCase();
  };

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 450 }} className="my-4">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          onClick={() => {
            router.push(`/room/${data.id}`);
          }}
          image="https://img.freepik.com/free-vector/classroom-mathematics-learning_107791-1354.jpg?w=2000"
          alt="classroom"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Room #{data.id} - {data.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ marginBottom: '5px' }}
          >
            {fistLetterMayus(data.day)} - {data.time} hs - Total students:{' '}
            {data.students.length}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="overflow-auto"
          >
            {data.content}
          </Typography>
        </CardContent>
        <div className="flex justify-center space-x-12 mb-4">
          {user?.rol === 'ADMIN' && (
            <>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setModals({ ...modals, edit: true })}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setModals({ ...modals, delete: true })}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </CardActionArea>
      {modals.edit && (
        <AddOrEditRoom
          open={modals.edit}
          type="update"
          onClose={() => setModals({ ...modals, edit: false })}
          room={data}
        />
      )}
      {modals.delete && (
        <DeleteRoom
          open={modals.delete}
          onClose={() => setModals({ ...modals, delete: false })}
          room={data}
        />
      )}
    </Card>
  );
}
