import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MessageSuccess } from './MessageSuccess';
import { Navigate, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export function NestedModal() {
  const [open, setOpen] = React.useState(true);
  
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false)
    navigate('/home')
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
          <MessageSuccess/>
      </Modal>
    </div>
  );
}