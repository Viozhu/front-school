import MyModal from '@/stylesComponents/Modal';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Avatar,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { GENDER, IStatusAlert, ROL } from '@/interface';
import { SnackBar } from '@/stylesComponents';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UppyUpload from '@/utils/uppy';
import { api } from '@/utils/axios';
import { selectOptionsGender, selectOptionsRol } from './helpers';

interface CreateUserProps {
  open: boolean;
  onClose: () => void;
}

interface IUser {
  name: string;
  email: string;
  image: string;
  age: number;
  gender: GENDER;
  rol: ROL;
}

function CreateUser({ open, onClose }: CreateUserProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUser>({ mode: 'onBlur' });
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState<IStatusAlert>({
    open: false,
    message: '',
    type: 'success',
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IUser> = async (form) => {
    const body: IUser = {
      name: form.name,
      image: file,
      email: form.email,
      gender: form.gender,
      age: Number(form.age),
      rol: form.rol as ROL,
    };

    try {
      const { data } = await api.post('/user/create', body);
      setAlert({ open: true, message: data.message, type: 'success' });
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      setAlert({ open: true, message: error.message, type: 'error' });
    }
  };

  const handleChangeSelect = (event: SelectChangeEvent, type) => {
    if (type === 'rol') {
      setValue('rol', event.target.value as ROL);
    }
    if (type === 'gender') {
      setValue('gender', event.target.value as GENDER);
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

      <MyModal open={open} onClose={onClose} title="Create user">
        <div className="m-3 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <div className="flex justify-center items-center mb-4 border-2 p-2 border-dashed rounded-md">
              <Avatar src={file} sizes="large" className="w-20 h-20" />
              <div className="w-2/3">
                <Typography variant="body1" className="ml-3">
                  Name: {watch('name')}
                </Typography>
                <Typography variant="body1" className="ml-3">
                  Email: {watch('email')}
                </Typography>
                <Typography variant="body1" className="ml-3">
                  Age: {watch('age')}
                </Typography>
              </div>
            </div>

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

            <UppyUpload setImgUrl={setFile} />
            <TextField
              {...register('age', { required: true })}
              label="Age"
              type="number"
              error={!!errors.age}
              helperText={errors.age ? 'Age is required' : ''}
            />
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                value={watch('gender')}
                onChange={(e) => handleChangeSelect(e, 'gender')}
              >
                {selectOptionsGender.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Rol"
                value={watch('rol')}
                onChange={(e) => handleChangeSelect(e, 'rol')}
              >
                {selectOptionsRol.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider />
            <div className="flex flex-row-reverse ">
              <Button variant="outlined" color="error" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="outlined"
                color="success"
                disabled={
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.age ||
                  !!errors.image ||
                  !!errors.rol ||
                  !!errors.gender
                }
                type="submit"
                className="mr-4"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </MyModal>
    </div>
  );
}

export default CreateUser;
