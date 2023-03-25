import { IRoom, IStatusAlert, IStudent } from '@/interface';
import { SnackBar } from '@/stylesComponents';
import MyModal from '@/stylesComponents/Modal';
import useAxios, { api } from '@/utils/axios';
import FaceIcon from '@mui/icons-material/Face';
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AddStudentsProps {
  open: boolean;
  onClose: () => void;
  room: IRoom;
}

function AddStudents({ open, onClose, room }: AddStudentsProps) {
  const [alert, setAlert] = useState<IStatusAlert>({
    open: false,
    message: '',
    type: 'success',
  });
  const [students, setStudents] = useState<IStudent[]>([]);

  const [optionAutocomplete, setOptionAutocomplete] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const { data } = useAxios('/user/getUsers');

  const onChangeAutocomplete = (value) => {
    const haveStudent = students.find((x) => x.id === value.value);

    if (!haveStudent) {
      const getStudent = data.data.find((x) => x.id === value.value);
      setStudents([...students, getStudent]);
    }
  };

  const formatOptions = (array) => {
    const options = array.map((userArr) => {
      return { label: userArr.name, value: userArr.id };
    });
    return setOptionAutocomplete(options);
  };

  const chiphandleDelete = (chip) => {
    setStudents(students.filter((student) => student.id !== chip.id));
  };

  useEffect(() => {
    if (!data) return;
    formatOptions([...data.data]);
  }, [data]);

  useEffect(() => {
    if (!room) return;
    setStudents(room.students);
  }, [room]);

  const router = useRouter();

  const onSubmit = async () => {
    const body = {
      students: students.map((student) => student.id),
      id: room.id,
    };
    try {
      const response = await api.post('/room/addStudents', body);
      setAlert({
        open: true,
        message: response.data.message,
        type: 'success',
      });

      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (error) {
      setAlert({
        open: true,
        message: error.response.data.message,
        type: 'error',
      });
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
      <MyModal open={open} onClose={onClose} title="Add students to this room">
        <div className="p-4 w-full">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={optionAutocomplete}
            disableClearable
            onChange={(event, value) => onChangeAutocomplete(value)}
            renderInput={(params) => <TextField {...params} label="Member" />}
          />
          <Typography
            variant="body2"
            className="mt-1 text-gray-300"
            align="center"
          >
            You can add more than one member
          </Typography>

          <Typography variant="body1" className="mt-3 ">
            Students in this room
          </Typography>
          <div className="flex items-center min-h-[30px] mb-4 justify-center space-x-2 flex-wrap border border-dashed rounded-md">
            {students.map((student) => (
              <div className="m-1">
                <Chip
                  key={student?.id}
                  icon={<FaceIcon />}
                  id={student?.id?.toString()}
                  onDelete={() => chiphandleDelete(student)}
                  label={student?.name}
                />
              </div>
            ))}
          </div>

          <Divider />
          <div className="flex flex-row-reverse mt-3">
            <Button variant="outlined" color="error" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outlined"
              onClick={onSubmit}
              color="success"
              disabled={students.length === 0}
              type="submit"
              className="mr-4"
            >
              Submit
            </Button>
          </div>
        </div>
      </MyModal>
    </>
  );
}

export default AddStudents;
