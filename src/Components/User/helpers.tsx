import { FAMILYRELATION, IRoom } from '@/interface';
import { IconButton } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const generateRowsRooms = (rooms: IRoom[]): GridRowsProp => {
  if (!rooms) return [];
  return rooms.map((room: IRoom) => {
    return {
      id: room.id,
      name: room.name,
      day: room.day,
      time: room.time,
      content: room.content,
    };
  });
};

export const generateColumns = (redirect): GridColDef[] => {
  const columns = [
    { field: 'name', headerName: 'Name', width: 130, flex: 1 },
    { field: 'content', headerName: 'Content', width: 130, flex: 1 },
    { field: 'day', headerName: 'Day', width: 130, flex: 1 },
    { field: 'time', headerName: 'Time', width: 130, flex: 1 },
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
              onClick={() => redirect(params.row.id)}
            >
              <VisibilityIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return columns;
};

export const fistLetterMayus = (word: string | FAMILYRELATION) => {
  const str = word as string;
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};
