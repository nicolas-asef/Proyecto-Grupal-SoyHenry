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
import DeleteUserWorker from '../../DeleteUserWorker/DeleteUserWorker';




export default function TableWorker() {

  const array = useSelector(state => state.allWorkers)
  const [actualizar, setActualizar] = useState ()
  const dispatch = useDispatch()

  const reload = () => {
    setActualizar(actualizar === true ? false : true)
  }
  
  useEffect(() => {
      dispatch(getWorkers())
  },[actualizar])

    return (
      <div>
        <h1 className={s.title}>Workers</h1>
        <TableContainer component={Paper} className={s.table}>
          <Table sx={{ Width: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={s.tableTop}>Image</TableCell>
                <TableCell align="center" className={s.tableTop}>id</TableCell>
                <TableCell align="center" className={s.tableTop}>Nombre</TableCell>
                <TableCell align="center" className={s.tableTop}>DNI</TableCell>
                <TableCell align="center" className={s.tableTop}>E-mail</TableCell>
                <TableCell align="center" className={s.tableTop}>Telefono</TableCell>
                <TableCell align="center" className={s.tableTop}>Profesion</TableCell>
                <TableCell align="center" className={`${s.tableTop} ${s.flex}`}>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((el) => (
                <TableRow
                key={el.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                > 
                  <TableCell align="center" className={`${s.tableBot}`}><img className={s.img} src={el.User.img}/></TableCell>
                  <TableCell align="center" component="th" scope="row" className={s.tableBot}>{el.ID}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.User.name} {el.User.lastName}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.User.dni}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.User.email}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.User.phone}</TableCell>
                  {el.Jobs && el.Jobs.map(el => {
                    return (
                      <TableCell align="center" className={s.tableBot}>{el.name}</TableCell>
                    )
                  })}
                  <TableCell align="left" className={`${s.tableBot} ${s.flex}`}>
                    <DeleteUserWorker name={`${el.User.name} ${el.User.lastName}`} id={el.User.ID} condition={el.User.isDeleted} callbk={reload}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
