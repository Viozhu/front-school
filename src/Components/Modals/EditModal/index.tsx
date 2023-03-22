import MyModal from '@/stylesComponents/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Divider } from '@mui/material';

interface FormData {
  firstName: string;
  lastName: string;
}

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

function EditModal({ open, onClose, user }: EditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  console.log(user);

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <MyModal open={open} onClose={onClose} title="Edit user">
      <div className="m-3 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
        >
          <TextField
            {...register('firstName', { required: true })}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName ? 'First Name is required' : ''}
          />
          <TextField
            {...register('lastName', { required: true })}
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName ? 'Last Name is required' : ''}
          />
          <Divider />
          <div className="flex flex-row-reverse ">
            <Button variant="outlined" color="error">
              Close
            </Button>
            <Button
              variant="outlined"
              color="success"
              disabled={!!errors.firstName || !!errors.lastName}
              type="submit"
              className="mr-4"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </MyModal>
  );
}

export default EditModal;
