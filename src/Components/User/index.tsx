import useAxios from '@/utils/axios';

import { useCustomContext } from '@/Context';
import { IStudent } from '@/interface';
import { Table } from '@/stylesComponents';
import { useState } from 'react';

import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import FaceIcon from '@mui/icons-material/Face';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fistLetterMayus, generateColumns, generateRowsRooms } from './helpers';
import EditModal from '../Modals/EditModal';
import DeleteModal from '../Modals/DeleteModal';

type UserProps = {
  id: string | string[];
};

function UserComponent({ id }: UserProps): JSX.Element {
  const { data } = useAxios(`/user/getUser/${id}`);
  const { user: userLogged } = useCustomContext();
  const user: IStudent = data?.data;
  const router = useRouter();
  const [modals, setModals] = useState({
    edit: false,
    delete: false,
  });

  const redirect = (idRoom: string) => {
    router.push(`/room/${idRoom}`);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex my-2">
        <div>
          <Card className="m-2">
            <CardContent>
              <Image
                src={user?.image}
                alt="avatar"
                width={128}
                height={128}
                className=" rounded-full mx-auto p-2 mb-4"
              />
              <Typography
                variant="body1"
                gutterBottom
                align="center"
                className="font-bold"
              >
                {user?.name}
              </Typography>
              <Typography variant="body1" gutterBottom align="center">
                {user?.email}
              </Typography>
              {(userLogged?.rol === 'ADMIN' || userLogged?.id === user?.id) && (
                <Box className="flex justify-center mt-4 space-x-1">
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => setModals({ ...modals, edit: true })}
                  >
                    Edit
                  </Button>
                  {userLogged?.rol === 'ADMIN' && (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => setModals({ ...modals, delete: true })}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
          <Card className="m-2">
            <CardHeader title="Social Media" className="m-2" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="www.google.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${user?.name}`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TwitterIcon style={{ color: '#55acee' }} />
                  </ListItemIcon>
                  <ListItemText primary={`@${user?.name}`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FacebookIcon style={{ color: '#3b5998' }} />
                  </ListItemIcon>
                  <ListItemText primary={`${user?.name}`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
        <div className="m-2 w-[50vw] space-y-2">
          <Paper elevation={3} className="p-3 space-y-3">
            <Typography
              variant="h6"
              align="center"
              className="underline decoration-orange-400"
            >
              User Details
            </Typography>
            <Typography variant="body1" align="center" className="px-4">
              The student is a {user?.age}-year-old junior with a strong
              interest in IT. They have experience coding in Java and Python and
              have created several websites and mobile apps. They excel
              academically, taking advanced courses in computer science and
              participating in programming competitions. They are working on
              improving their communication and teamwork skills through
              extracurricular activities.
            </Typography>
          </Paper>
          <Paper elevation={3} className="p-3">
            <Typography
              variant="h6"
              align="center"
              className="underline  decoration-orange-400"
            >
              ClassRooms
            </Typography>
            <Table
              height="300px"
              rows={generateRowsRooms(user?.rooms)}
              columns={generateColumns(redirect)}
            />
          </Paper>
          <Paper elevation={3} className="p-3">
            <Typography
              variant="h6"
              align="center"
              className="underline  decoration-orange-400"
            >
              Family Members
            </Typography>
            <div
              className="flex items-center justify-center"
              style={{ minHeight: '96px' }}
            >
              {user && user?.familyMember?.length > 0 ? (
                user?.familyMember?.map((member) =>
                  member.userMember ? (
                    <Chip
                      icon={<FaceIcon />}
                      label={`${member.userMember.name} - ${fistLetterMayus(
                        member.type,
                      )}`}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      align="center"
                      className="mt-2 text-gray-400"
                    >
                      This user has no family members
                    </Typography>
                  ),
                )
              ) : (
                <Typography
                  variant="body1"
                  align="center"
                  className="mt-2 text-gray-400"
                >
                  This user has no family members
                </Typography>
              )}{' '}
            </div>
          </Paper>
        </div>
      </div>

      {modals.edit && (
        <EditModal
          open={modals.edit}
          onClose={() => setModals({ ...modals, edit: false })}
          user={user}
        />
      )}
      {modals.delete && (
        <DeleteModal
          open={modals.delete}
          onClose={() => setModals({ ...modals, delete: false })}
          user={user}
        />
      )}
    </div>
  );
}

export default UserComponent;
