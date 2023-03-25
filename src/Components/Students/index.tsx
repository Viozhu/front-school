import { useCustomContext } from '@/Context';
import useAxios from '@/utils/axios';
import { Paper, Typography, Button } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'src/stylesComponents/Table';
import CreateUser from '../Modals/CreateUser';
import DeleteModal from '../Modals/DeleteModal';
import EditModal from '../Modals/EditModal';
import { generateColumns, generateRows } from './helpers';

function StudentsComponent() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [createModal, setCreateModal] = useState(false);
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
      {user?.rol === 'ADMIN' && (
        <div className="flex flex-row-reverse pr-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCreateModal(true)}
          >
            Create a new student
          </Button>
        </div>
      )}
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
      {createModal && (
        <CreateUser open={createModal} onClose={() => setCreateModal(false)} />
      )}
    </Paper>
  );
}

export default StudentsComponent;
