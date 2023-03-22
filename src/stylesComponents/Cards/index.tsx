import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';
import { DAY, IRoom } from '@/interface';

interface CardComponentProps {
  data: IRoom;
}

export default function CardComponent({
  data,
}: CardComponentProps): JSX.Element {
  const router = useRouter();

  const fistLetterMayus = (word: string | DAY) => {
    const day = word as string;
    return day.charAt(0).toUpperCase() + day.slice(1).toLocaleLowerCase();
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="my-4">
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
          <Typography variant="body2" color="text.secondary">
            {data.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
