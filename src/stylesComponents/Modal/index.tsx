import React from 'react';
import { Button, Divider, Modal, Typography } from '@mui/material';
import styles from './styles.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode | string;
  noCloseButton?: boolean;
}
function MyModal({
  open,
  onClose,
  title,
  children,
  noCloseButton,
}: ModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        className="flex justify-center items-center focus:ring-transparent"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className="bg-white w-[30vw] rounded p-6"
          style={{ minWidth: '400px' }}
        >
          <Typography variant="h6" id="modal-title">
            {title}
          </Typography>
          <div
            className={`overflow-auto ${styles.childrenContainer} mt-4`}
            style={{ maxHeight: '70vh' }}
          >
            {children}
          </div>
          {noCloseButton && (
            <>
              <Divider />
              <div className="w-full flex flex-row-reverse mt-3">
                <Button onClick={onClose}>Close Modal</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

MyModal.defaultProps = {
  noCloseButton: false,
};

export default MyModal;
