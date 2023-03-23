import { IStudent } from '@/interface';
import { SnackBar } from '@/stylesComponents';
import MyModal from '@/stylesComponents/Modal';
import { useState, useEffect } from 'react';

import useAxios, { api } from '@/utils/axios';
import { useRouter } from 'next/router';
import {
  Autocomplete,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
} from '@mui/material';
import { selectOptions } from './helpers';

interface AddFamilyModalProps {
  open: boolean;
  onClose: () => void;
  user: IStudent;
}
interface IFamily {
  userId: string;
  familyMemberId: string;
  type: string;
}

function AddFamilyModal({ open, onClose, user }: AddFamilyModalProps) {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });
  const router = useRouter();

  const [optionAutocomplete, setOptionAutocomplete] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const [family, setFamily] = useState<IFamily>({
    userId: '0',
    familyMemberId: '0',
    type: '',
  });

  const { data } = useAxios('/user/getUsers');

  const formatOptions = (array) => {
    const options = array
      .filter((x) => x.id !== user.id)
      .map((userArr) => {
        return { label: userArr.name, value: userArr.id };
      });
    return setOptionAutocomplete(options);
  };

  const onChangeAutocomplete = (value) => {
    setFamily({
      ...family,
      familyMemberId: value.value.toString(),
      userId: user.id.toString(),
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFamily({ ...family, type: event.target.value });
  };

  useEffect(() => {
    if (!data) return;
    if (!user) return;
    formatOptions(data.data);
  }, [data, user]);

  const onSubmit = async () => {
    try {
      await api.post('/familymember/add', family);
      setAlert({
        open: true,
        message: 'Family member added successfully',
        type: 'success',
      });
      router.reload();
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error adding family member',
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
      <MyModal open={open} onClose={onClose} title="Add your family Member">
        <div className="p-2 space-y-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={optionAutocomplete}
            disableClearable
            onChange={(event, value) => onChangeAutocomplete(value)}
            renderInput={(params) => <TextField {...params} label="Member" />}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Relationship"
              value={family.type}
              onChange={handleChangeSelect}
            >
              {selectOptions.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
            disabled={!family.userId || !family.familyMemberId || !family.type}
            type="submit"
            className="mr-4"
          >
            Submit
          </Button>
        </div>
      </MyModal>
    </>
  );
}

export default AddFamilyModal;
