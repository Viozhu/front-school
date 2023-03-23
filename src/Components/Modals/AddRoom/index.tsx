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
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IStatusAlert, IRoom } from '@/interface';
import { SnackBar } from '@/stylesComponents';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '@/utils/axios';
import { daysOptions } from './helpers';

interface FormData {
  name: string;
  content: string;
  day: string;
  time: string;
  capacity: number;
}

interface AddOrEditRoomProps {
  open: boolean;
  onClose: () => void;
  room: IRoom | any;
  type: 'create' | 'update';
}

function AddOrEditRoom({ open, onClose, room, type }: AddOrEditRoomProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ mode: 'onBlur' });
  const [alert, setAlert] = useState<IStatusAlert>({
    open: false,
    message: '',
    type: 'success',
  });

  const router = useRouter();

  useEffect(() => {
    if (!room) return;
    setValue('name', room.name);
    setValue('content', room.content);
    setValue('day', room.day);
    setValue('time', room.time);
    setValue('capacity', room.capacity);
  }, [room]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const body: FormData = {
      ...(type === 'update' && { id: room.id.toString() }),
      name: formData.name,
      content: formData.content,
      day: formData.day,
      time: formData.time,
      capacity: Number(formData.capacity),
    };
    try {
      const { data } = await api.post(`/room/${type}`, body);
      setAlert({ open: true, message: data.message, type: 'success' });
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      setAlert({ open: true, message: error.message, type: 'error' });
    }
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValue('day', event.target.value);
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

      <MyModal open={open} onClose={onClose} title="Add a new Room">
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
              {...register('content', { required: true })}
              label="Content"
              error={!!errors.content}
              helperText={errors.content ? 'Content is required' : ''}
            />
            <div className="flex">
              <FormControl className="w-2/3">
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Day"
                  defaultValue={room?.day}
                  onChange={handleChangeSelect}
                >
                  {daysOptions.map((day) => (
                    <MenuItem value={day.value}>{day.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                {...register('time', { required: true })}
                type="time"
                className="w-1/3"
                error={!!errors.time}
                helperText={errors.time ? 'Time is required' : ''}
              />
            </div>

            <TextField
              {...register('capacity', { required: true })}
              label="Capacity"
              type="number"
              error={!!errors.capacity}
              helperText={errors.capacity ? 'Capacity is required' : ''}
            />
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
                  !!errors.time ||
                  !!errors.content ||
                  !!errors.capacity ||
                  !!errors.day
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

export default AddOrEditRoom;
