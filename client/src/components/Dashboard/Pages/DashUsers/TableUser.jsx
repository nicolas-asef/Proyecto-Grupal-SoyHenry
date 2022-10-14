import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from "./TableUser.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../../../redux/actions/actions';
import { useEffect } from 'react';

export default function TableUser() {

  const array = useSelector(state => state.newUser)
  const [actualizar, setActualizar] = useState ()

  const dispatch = useDispatch()

  const eliminar = (e) => {
    let buscar = array.filter(el => el.id === e)
    let deleted = false
    if (buscar[0].isDeleted === false){
      deleted = true
    }
    dispatch(deleteUser(buscar[0].id, deleted))
    setActualizar(actualizar === true ? false : true)
  }

  useEffect(() => {
      dispatch(getUsers())
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
                <TableCell align="left" className={`${s.tableTop} ${s.flex}`}>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((el) => (
                <TableRow
                key={el.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className={s.tableBot}>
                    {el.id}
                  </TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.name} {el.lastName}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.dni}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.email}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{el.phone}</TableCell>
                  <TableCell align="left" className={`${s.tableBot} ${s.flex}`}>
                    {
                      el.isDeleted === false 
                      ? <DeleteIcon className={s.delete} onClick={() => eliminar(el.id)}/> 
                      : <ReplayIcon className={s.return} onClick={() => eliminar(el.id)}/>
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