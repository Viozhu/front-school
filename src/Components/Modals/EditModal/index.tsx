import MyModal from '@/stylesComponents/Modal';
import { Button, Divider, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IStudent } from '@/interface';
import { SnackBar } from '@/stylesComponents';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '@/utils/axios';

interface FormData {
  name: string;
  email: string;
  age: number;
}

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  user: IStudent;
}

interface IResponse {
  id: string;
  name: string;
  email: string;
  age: number;
}

function EditModal({ open, onClose, user }: EditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ mode: 'onBlur' });
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('age', user.age);
  }, [user]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const body: IResponse = {
      id: user.id.toString(),
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
    };

    try {
      const { data } = await api.post('/user/update', body);
      setAlert({ open: true, message: data.message, type: 'success' });
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      setAlert({ open: true, message: error.message, type: 'error' });
    }
  };

  return (
    <div>
      {alert.open && (
        <SnackBar
          open={alert.open}
          onClose={() => setAlert({ ...alert, open: false })}
          message={alert.message}
          type={alert.type}
        />
      )}
      {user && (
        <MyModal open={open} onClose={onClose} title="Edit user">
          <div className="m-3 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-3"
            >
              <TextField
                {...register('name', { required: true })}
                label="Name"
                error={!!errors.name}
                helperText={errors.name ? ' Name is required' : ''}
              />
              <TextField
                {...register('email', { required: true })}
                label="Email"
                error={!!errors.email}
                helperText={errors.email ? 'Email is required' : ''}
              />
              <TextField
                {...register('age', { required: true })}
                label="Age"
                type="number"
                error={!!errors.age}
                helperText={errors.age ? 'Age is required' : ''}
              />
              <Divider />
              <div className="flex flex-row-reverse ">
                <Button variant="outlined" color="error" onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  disabled={!!errors.name || !!errors.email || !!errors.age}
                  type="submit"
                  className="mr-4"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </MyModal>
      )}
    </div>
  );
}

export default EditModal;
