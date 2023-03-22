import { useCustomContext } from '@/Context';
import { GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table from 'src/stylesComponents/Table';
import { generateColumns, generateRows } from './helpers';

function StudentsComponent() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { user } = useCustomContext();
  const router = useRouter();

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

  const redirect = (id) => {
    router.push(`/user/${id}`);
  };

  const handleDelete = async (id) => {
    console.log(id);
  };

  const handleEdit = async (id) => {
    console.log(id);
  };

  return (
    <div>
      <Table
        rows={rows}
        columns={generateColumns(user?.rol, redirect, handleEdit, handleDelete)}
      />
    </div>
  );
}

export default StudentsComponent;
