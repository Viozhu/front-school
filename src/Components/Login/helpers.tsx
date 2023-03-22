import LoginIcon from '@mui/icons-material/Login';
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const generateColumns = (login): GridColDef[] => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, flex: 1 },
    { field: 'name', headerName: 'Name', width: 130, flex: 1 },
    { field: 'email', headerName: 'Email', width: 130, flex: 1 },
    { field: 'age', headerName: 'Age', width: 130, flex: 1 },
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
