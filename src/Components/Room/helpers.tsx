import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const generateColumns = (rol, redirect, openModals): GridColDef[] => {
  const columns = [
    {
      field: 'image',
      headerName: 'Picture',
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Avatar alt="Remy Sharp" src={params.row.image} />
      ),
    },
    { field: 'id', headerName: 'ID', width: 70, flex: 1 },
    { field: 'name', headerName: 'Name', width: 130, flex: 1 },
    {
      field: 'email',
      headerName: 'Email',
      width: 130,
      flex: 1,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 130,
      flex: 1,
      renderCell: (params) => <p>{params.row.age} years</p>,
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
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
                onClick={() => openModals('edit', params.row)}
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
        );
      },
    },
  ];

  return columns;
};
