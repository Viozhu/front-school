import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardComponent({ data }): JSX.Element {
  return (
    <Card sx={{ maxWidth: 345 }} className="my-4">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.freepik.com/free-vector/classroom-mathematics-learning_107791-1354.jpg?w=2000"
          alt="classroom"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Room #{data.id} - {data.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ marginBottom: '5px' }}
          >
            {data.day} - {data.time} - Total students: {data.students.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Únete a nuestra comunidad de aprendizaje en {data.name}. Con un
            ambiente acogedor y características de última generación, ¡inicia
            una experiencia de aprendizaje cómoda y efectiva hoy!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
