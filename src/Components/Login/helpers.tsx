import { IStudent } from '@/interface';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

export const generateRows = (students: IStudent[]): GridRowsProp => {
  return students.map((student: IStudent) => {
    return {
      id: student.id,
      name: student.name,
      age: student.age,
      gender: student.gender,
      email: student.email,
      rol: student.rol,
      rooms: student.rooms.length,
      familyMember: student.familyMember.length,
    };
  });
};

export const generateColumns = (login): GridColDef[] => {
  const columns = [
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
    { field: 'rol', headerName: 'Rol', width: 130, flex: 1 },
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
            <IconButton
              color="info"
              aria-label="upload picture"
              component="span"
              onClick={() => login(params.row)}
            >
              <Tooltip title="Login">
                <LoginIcon />
              </Tooltip>
            </IconButton>
          </div>
        );
      },
    },
  ];

  return columns;
};
