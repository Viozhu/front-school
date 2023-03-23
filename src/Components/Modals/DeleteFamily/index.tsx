import { SnackBar } from '@/stylesComponents';
import MyModal from '@/stylesComponents/Modal';
import { useState } from 'react';

import { api } from '@/utils/axios';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import * as styles from './styles';

interface DeleteFamilyProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

function DeleteFamily({ open, onClose, user }: DeleteFamilyProps) {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { data } = await api.delete(`familymember/delete/${user.id}`);
      setAlert({ open: true, message: data.message, type: 'success' });
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      setAlert({ open: true, message: error.message, type: 'error' });
    }
  };
  return (
    <>
      {alert.open && (
        <SnackBar
          open={alert.open}
          onClose={() => setAlert({ ...alert, open: false })}
          message={alert.message}
          type={alert.type}
        />
      )}
      <MyModal open={open} onClose={onClose} title="">
        <div className={styles.CONTAINER}>
          <p className="text-2xl font-bold">Are you sure?</p>
          <p className="text-xl flex ">
            You want to <p className="text-red-500 mx-2">delete</p> this family
            member?
          </p>
          <p className="text-xl">
            {user?.userMember?.name} - {user?.type}
          </p>
          <p className="text-l text-gray-300">This action cannot be undone.</p>

          <div className={styles.BUTTON_CONTAINER}>
            <Button
              className={styles.BUTTON_DELETE}
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="default"
              className={styles.BUTTON_CANCEL}
              onClick={onClose}
            >
              No
            </Button>
          </div>
        </div>
      </MyModal>
    </>
  );
}

export default DeleteFamily;
