import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from "./TableWorker.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkers, deleteUser } from '../../../../redux/actions/actions';
import ReplayIcon from '@mui/icons-material/Replay';



export default function TableWorker() {

  const array = useSelector(state => state.allWorkers)
  const [actualizar, setActualizar] = useState ()
  const dispatch = useDispatch()

  const eliminar = (e) => {
    let buscar = array.filter(el => el.User.ID === e)
    console.log(buscar)
    let deleted = false
    if (buscar[0].User.isDeleted === false){
      deleted = true
    }
    dispatch(deleteUser(buscar[0].User.ID, deleted))
    setActualizar(actualizar === true ? false : true)
  }
  
  useEffect(() => {
      dispatch(getWorkers())
  },[actualizar])

    return (
      <div>
        <h1 className={s.title}>{}</h1>
        <TableContainer component={Paper} className={s.table}>
          <Table sx={{ Width: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className={s.tableTop}>id</TableCell>
                <TableCell align="left" className={s.tableTop}>Nombre</TableCell>
                <TableCell align="left" className={s.tableTop}>DNI</TableCell>
                <TableCell align="left" className={s.tableTop}>E-mail</TableCell>
                <TableCell align="left" className={s.tableTop}>Telefono</TableCell>
                <TableCell align="left" className={s.tableTop}>Profesion</TableCell>
                <TableCell align="left" className={`${s.tableTop} ${s.flex}`}>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((el) => (
                <TableRow
                key={el.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className={s.tableBot}>
                    {el.ID}
                  </TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.User.name} {el.lastName}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.User.dni}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.User.email}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.User.phone}</TableCell>
                  {el.Jobs && el.Jobs.map(el => {
                    return (
                      <TableCell align="left" className={s.tableBot}>{el.name}</TableCell>
                    )
                  })}
                  <TableCell align="left" className={`${s.tableBot} ${s.flex}`}>
                    {
                      el.User.isDeleted === false 
                      ? <DeleteIcon className={s.delete} onClick={() => eliminar(el.User.ID)}/> 
                      : <ReplayIcon className={s.return} onClick={() => eliminar(el.User.ID)}/>
                    }
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }