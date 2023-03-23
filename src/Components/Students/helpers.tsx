import { IStudent } from '@/interface';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Avatar, IconButton } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

export const generateRows = (students: IStudent[]): GridRowsProp => {
  return students
    .filter((st) => st.rol === 'STUDENT')
    .map((student: IStudent) => {
      return {
        id: student.id,
        name: student.name,
        age: student.age,
        gender: student.gender,
        email: student.email,
        rol: student.rol,
        image: student.image,
        rooms: student.rooms.length,
        familyMember: student.familyMember.length,
      };
    });
};

export const generateColumns = (rol, redirect, openModals): GridColDef[] => {
  const columns = [
    {
      field: 'image',
      headerName: 'Picture',
      width: 130,
      flex: 1,
      renderCell: (params) => <Avatar alt="N" src={params.row.image} />,
    },
    { field: 'id', headerName: 'ID', width: 70, flex: 1 },
    { field: 'name', headerName: 'Name', width: 130, flex: 1 },
    { field: 'email', headerName: 'Email', width: 130, flex: 1 },
    {
      field: 'age',
      headerName: 'Age',
      width: 130,
      flex: 1,
      renderCell: (params) => <p>{params.row.age} years</p>,
    },
    { field: 'gender', headerName: 'Gender', width: 130, flex: 1 },
    { field: 'rooms', headerName: 'Rooms', width: 130, flex: 1 },
    {
      field: 'familyMember',
      headerName: 'Family Members',
      width: 130,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      flex: 1,
      aling: 'center',
      renderCell: (params) => {
        return (
          <div>
            {' '}
            <IconButton
              color="info"
              aria-label="upload picture"
              component="span"
              onClick={() => redirect(params.row.id)}
            >
              <AccountBoxIcon />
            </IconButton>
            {rol === 'ADMIN' && (
              <>
                <IconButton
                  color="secondary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => openModals('edit', params.row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => openModals('delete', params.row)}
                >
                  <PersonRemoveIcon />
                </IconButton>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return columns;
};
