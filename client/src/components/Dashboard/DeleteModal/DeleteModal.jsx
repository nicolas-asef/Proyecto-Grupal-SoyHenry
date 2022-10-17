import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import s from "./DeleteModal.module.css"
import { useDispatch } from 'react-redux';
import { deleteJob, deleteCountry } from '../../../redux/actions/actions';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function DeleteModal({name, id, callbk, msg}) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    if (name === "Job"){
      dispatch(deleteJob(id))
    }
    if (name === "Country"){
      dispatch(deleteCountry(id))
    }
    callbk(false)
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <DeleteIcon className={s.delete}/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className={s.top}>
            <h2 className={s.h2} id="parent-modal-title">Delete {msg}?</h2>
          </div>
          <div className={s.mid}>
            <p className={s.p}>Are you sure you want to delete {msg}?</p>
          </div>
          <div className={s.bot}>
          <Button variant='contained' size='large' type='submit' className={s.button} onClick={handleDelete}>Si</Button>
          <Button variant='contained' size='large' type='submit' className={s.button} sx={{ marginLeft: 5  }} onClick={handleClose}>No</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}