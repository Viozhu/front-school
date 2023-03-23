import { useCustomContext } from '@/Context';
import { Table } from '@/stylesComponents';
import useAxios from '@/utils/axios';
import { Paper, Typography } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { generateColumns, generateRows } from './helpers';

function LoginComponent() {
  const { setUser } = useCustomContext();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const router = useRouter();

  const handleLogin = (user) => {
    setUser(user);
    router.push('/');
  };

  const { data } = useAxios('/user/getUsers');

  useEffect(() => {
    if (data) setRows(generateRows(data.data));
  }, [data]);

  return (
    <Paper className="m-6 p-4">
      <Typography
        variant="h4"
        className="m-4 underline decoration-orange-500"
        align="center"
      >
        Login with your user
      </Typography>
      <Typography variant="body1" align="center">
        If you dont have an account, please contact with the administrator
      </Typography>

      <Table height="70vh" rows={rows} columns={generateColumns(handleLogin)} />
    </Paper>
  );
}

export default LoginComponent;
