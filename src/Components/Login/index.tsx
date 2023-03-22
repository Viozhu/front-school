import { useCustomContext } from '@/Context';
import { Table } from '@/stylesComponents';
import { Typography } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { generateRows } from '../Students/helpers';
import { generateColumns } from './helpers';

function LoginComponent() {
  const { setUser } = useCustomContext();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const router = useRouter();

  const handleLogin = (user) => {
    setUser(user);
    router.push('/');
  };

  const requestData = async () => {
    try {
      const { data } = await axios('http://localhost:4001/user/getUsers');
      setRows(generateRows(data.data));
    } catch (error) {
      setRows([]);
    }
  };

  useEffect(() => {
    requestData();
  }, []);

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
