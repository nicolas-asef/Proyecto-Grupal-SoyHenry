import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from "./TableUser.module.css"
import { useDispatch, useSelector } from 'react-redux';
import {getUsers } from '../../../../redux/actions/actions';
import { useEffect } from 'react';
import DeleteUserWorker from '../../DeleteUserWorker/DeleteUserWorker';

export default function TableUser() {

  const array = useSelector(state => state.onlyUser)
  const [actualizar, setActualizar] = useState ()

  const dispatch = useDispatch()

  const reload = () => {
    setActualizar(actualizar === true ? false : true)
  }

  useEffect(() => {
      dispatch(getUsers())
  },[actualizar])

    return (
      <div>
        <h1 className={s.title}>Users</h1>
        <TableContainer component={Paper} className={s.table}>
          <Table sx={{ Width: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={s.tableTop}>Imgage</TableCell>
                <TableCell align="center" className={s.tableTop}>id</TableCell>
                <TableCell align="center" className={s.tableTop}>Nombre</TableCell>
                <TableCell align="center" className={s.tableTop}>DNI</TableCell>
                <TableCell align="center" className={s.tableTop}>E-mail</TableCell>
                <TableCell align="center" className={s.tableTop}>Telefono</TableCell>
                <TableCell align="center" className={`${s.tableTop} ${s.flex}`}>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((el) => (
                <TableRow
                key={el.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" className={`${s.tableBot}`}><img className={s.img} src={el.img}/></TableCell>
                  <TableCell component="th" align="center" scope="row" className={s.tableBot}>
                    {el.id}
                  </TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.name} {el.lastName}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.dni}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.email}</TableCell>
                  <TableCell align="center" className={s.tableBot}>{el.phone}</TableCell>
                  <TableCell align="center" className={`${s.tableBot} ${s.flex}`}>
                    <DeleteUserWorker name={`${el.name} ${el.lastName}`} id={el.id} condition={el.isDeleted} callbk={reload}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
