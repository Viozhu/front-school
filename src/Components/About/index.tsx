import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { courses } from './helpers';

function AboutComponent(): JSX.Element {
  return (
    <div className="flex justify-center flex-col items-center">
      <Container maxWidth="lg" className="m-12 space-y-4">
        <Paper className="p-4">
          <Typography variant="h3" className="font-bold mb-1-">
            About Us
          </Typography>
          <Typography variant="body1">
            We are an IT academy dedicated to training the next generation of
            developers and data scientists.
          </Typography>
        </Paper>
        <Paper className="p-2  ">
          <Typography variant="h4" className="font-bold">
            Our Courses
          </Typography>
        </Paper>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card className="flex flex-col h-[350px]">
                <CardMedia
                  className="pt-52"
                  image={course.image}
                  title={course.title}
                />
                <CardContent className="">
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography>{course.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AboutComponent;
