import { IRoom, IStatusAlert, IStudent } from '@/interface';
import { SnackBar } from '@/stylesComponents';
import MyModal from '@/stylesComponents/Modal';
import { api } from '@/utils/axios';
import FaceIcon from '@mui/icons-material/Face';
import { Button, Chip, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface DeleteStudentsProps {
  open: boolean;
  onClose: () => void;
  room: IRoom;
}

function DeleteStudents({ open, onClose, room }: DeleteStudentsProps) {
  const [alert, setAlert] = useState<IStatusAlert>({
    open: false,
    message: '',
    type: 'success',
  });
  const [students, setStudents] = useState<IStudent[]>([]);
  const [studentsInRoom, setStudentsInRoom] = useState<IStudent[]>([]);

  const chiphandleDelete = (chip) => {
    setStudents(students.filter((student) => student.id !== chip.id));
  };

  useEffect(() => {
    if (!room) return;
    setStudents(room.students);
    setStudentsInRoom(room.students);
  }, [room]);

  const router = useRouter();

  const onSubmit = async () => {
    const body = {
      students: studentsInRoom
        .filter((x) => !students.includes(x))
        .map((x) => x.id),
      id: room.id,
    };
    try {
      const response = await api.post('/room/deleteStudents', body);
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
          <Typography variant="body2" className=" text-gray-300" align="center">
            You can delete more than one member
          </Typography>

          <Typography variant="body1" className="mt-3 ">
            Students in this room
          </Typography>
          <div className="flex items-center min-h-[30px] mb-4 justify-center space-x-2 flex-wrap border border-dashed rounded-md">
            {students.map((student) => (
              <div className="m-1">
                <Chip
                  key={student.id}
                  icon={<FaceIcon />}
                  id={student.id.toString()}
                  onDelete={() => chiphandleDelete(student)}
                  label={student.name}
                />
              </div>
            ))}
          </div>

          <Divider />
          <div className="flex flex-row-reverse mt-3">
            <Button
              variant="outlined"
              color="info"
              size="small"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="outlined"
              onClick={onSubmit}
              color="error"
              size="small"
              disabled={students.length === 0}
              type="submit"
              className="mr-4"
            >
              Delete
            </Button>
          </div>
        </div>
      </MyModal>
    </>
  );
}

export default DeleteStudents;
