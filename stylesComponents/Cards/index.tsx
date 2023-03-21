import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Room #1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Únete a nuestra comunidad de aprendizaje en [nombre de la room de
            clase]. Con un ambiente acogedor y características de última
            generación, ¡inicia una experiencia de aprendizaje cómoda y efectiva
            hoy!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
