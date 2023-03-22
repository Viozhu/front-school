import { IStudent } from '@/interface';
import MyModal from '@/stylesComponents/Modal';
import React from 'react';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  user: IStudent;
}

function DeleteModal({ open, onClose, user }: DeleteModalProps) {
  console.log(user);
  return (
    <MyModal open={open} onClose={onClose} title="Edit user">
      Edit
    </MyModal>
  );
}

export default DeleteModal;
