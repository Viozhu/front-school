import { useCustomContext } from '@/Context';
import useAxios from '@/utils/axios';
import { Paper, Typography } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'src/stylesComponents/Table';
import { generateColumns, generateRows } from './helpers';

function StudentsComponent() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { user } = useCustomContext();
  const router = useRouter();

  const { data } = useAxios({ url: '/user/getUsers' });

  useEffect(() => {
    if (data) setRows(generateRows(data.data));
  }, [data]);

  const redirect = (id) => {
    router.push(`/user/${id}`);
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

      <Table
        rows={rows}
        height="70vh"
        columns={generateColumns(user?.rol, redirect)}
      />
    </Paper>
  );
}

export default StudentsComponent;
