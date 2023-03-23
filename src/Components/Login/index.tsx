import { useCustomContext } from '@/Context';
import { Table } from '@/stylesComponents';
import useAxios from '@/utils/axios';
import { Typography } from '@mui/material';
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

  const { data } = useAxios({ url: '/user/getUsers' });

  useEffect(() => {
    if (data) setRows(generateRows(data.data));
  }, [data]);

  return (
    <div>
      <Typography variant="h4" color="primary" className="m-4" align="center">
        Login with your user
      </Typography>

      <div className="   w-[80%] flex mx-auto">
        <Table
          height="80vh"
          rows={rows}
          columns={generateColumns(handleLogin)}
        />
      </div>
    </div>
  );
}

export default LoginComponent;
