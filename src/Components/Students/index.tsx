import { useCustomContext } from '@/Context';
import useAxios from '@/utils/axios';
import { Paper, Typography } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'src/stylesComponents/Table';
import DeleteModal from '../Modals/DeleteModal';
import EditModal from '../Modals/EditModal';
import { generateColumns, generateRows } from './helpers';

function StudentsComponent() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { user } = useCustomContext();
  const router = useRouter();
  const [modals, setModals] = useState({
    edit: false,
    delete: false,
    user: null,
  });

  const { data } = useAxios('/user/getUsers');

  useEffect(() => {
    if (data) setRows(generateRows(data.data));
  }, [data]);

  const redirect = (id) => {
    router.push(`/user/${id}`);
  };

  const openModals = (type: 'edit' | 'delete', userData) => {
    setModals({ ...modals, [type]: true, user: userData });
  };

  return (
    <Paper className="m-6 p-4">
      <Typography
        variant="h4"
        className="m-4 underline decoration-orange-500"
        align="center"
      >
        Students List
      </Typography>
      <Typography variant="body1" align="center">
        Here you can see all the students registered in the system
      </Typography>

      <Table
        rows={rows}
        height="70vh"
        columns={generateColumns(user?.rol, redirect, openModals)}
      />
      {modals.edit && (
        <EditModal
          open={modals.edit}
          onClose={() => setModals({ ...modals, edit: false })}
          user={modals.user}
        />
      )}
      {modals.delete && (
        <DeleteModal
          open={modals.delete}
          onClose={() => setModals({ ...modals, delete: false })}
          user={modals.user}
        />
      )}
    </Paper>
  );
}

export default StudentsComponent;
