import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import s from "./DeleteUserWorker.module.css"
import { deleteUser } from '../../../redux/actions/actions';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteUserWorker({name, id, condition ,callbk}) {

  const dispatch = useDispatch ()
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleDelete = () => {
    setOpen(false);
    let deleted = false
    if (condition === false){
      deleted = true
    }
      dispatch(deleteUser(id, deleted))
    callbk(false)
  }
  return (
    <div>
      <Button onClick={handleOpen}>
        {
          condition === false 
          ? <DeleteIcon className={s.delete} /> 
          : <ReplayIcon className={s.return} />
        }
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className={s.top}>
              {
                condition === true
                ? <h2 className={s.h2} id="parent-modal-title">Return {name}?</h2>
                : <h2 className={s.h2} id="parent-modal-title">Delete {name}?</h2>
              }
            </div>
            <div className={s.mid}>
              {
                condition === true
                ? <p className={s.p}>Are you sure you want to return {name}?</p>
                : <p className={s.p}>Are you sure you want to delete {name}?</p>
              }
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