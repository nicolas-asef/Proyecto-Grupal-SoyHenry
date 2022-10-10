import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from "./TableUserWorker.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react"


export default function TableUserWorker({name}) {
  const [user, setUser] = useState(
    [
      {
        name: "Nicolas",
        user: "nico2022",
        mail: "nicolas@gmail.com",
        provincia: "Cordoba",
        estado: "Online",
      },
      {
        name: "Melina",
        user: "mel123",
        mail: "melina123@gmail.com",
        provincia: "Buenos Aires",
        estado: "Online",
      },
      {
        name: "Micaela",
        user: "mica22",
        mail: "mica_22@gmail.com",
        provincia: "Cordoba",
        estado: "Offline",
      },
        {
          name: "Martin",
          user: "martin3221",
          mail: "mar@gmail.com",
          provincia: "Tucuman",
          estado: "Online",
        },    {
          name: "Juan",
          user: "juancito",
          mail: "juancho_@gmail.com",
          provincia: "Chaco",
          estado: "Offline",
        },
        {
          name: "Micaela",
          user: "mica2222",
          mail: "micaela_mi@gmail.com",
          provincia: "Cordoba",
          estado: "Online",
        },
        {
          name: "Nicolas",
          user: "nico20221",
          mail: "nicolas@gmail.com",
          provincia: "Cordoba",
          estado: "Online",
        },
        {
          name: "Melina",
          user: "mel1231",
          mail: "melina123@gmail.com",
          provincia: "Buenos Aires",
          estado: "Online",
        },
        {
          name: "Micaela",
          user: "mica221",
          mail: "mica_22@gmail.com",
          provincia: "Cordoba",
          estado: "Offline",
        },
        {
          name: "Martin",
          user: "martin32211",
          mail: "mar@gmail.com",
          provincia: "Tucuman",
          estado: "Online",
        },    {
          name: "Juan",
          user: "juancito1",
          mail: "juancho_@gmail.com",
          provincia: "Chaco",
          estado: "Offline",
        },
        {
          name: "Micaela",
          user: "mica22221",
        mail: "micaela_mi@gmail.com",
        provincia: "Cordoba",
        estado: "Online",
      }
      
      
    ]
  )
  const eliminar = (e) => {
  
    let buscar = user.filter(el => el.user !== e)
    setUser(buscar)
  }
  console.log(user)
    return (
      <div>
        <h1 className={s.title}>{name}</h1>
        <TableContainer component={Paper} className={s.table}>
          <Table sx={{ Width: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className={s.tableTop}>Nombre</TableCell>
                <TableCell align="left" className={s.tableTop}>Usuario</TableCell>
                <TableCell align="left" className={s.tableTop}>e-mail</TableCell>
                <TableCell align="left" className={s.tableTop}>Provincia</TableCell>
                <TableCell align="left" className={s.tableTop}>Estado</TableCell>
                <TableCell align="left" className={`${s.tableTop} ${s.flex}`}>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user) => (
                <TableRow
                  key={user.user}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className={s.tableBot}>
                    {user.name}
                  </TableCell>
                  <TableCell align="left" className={s.tableBot}>{user.user}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{user.mail}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{user.provincia}</TableCell>
                  <TableCell align="left" className={s.tableBot}>{user.estado}</TableCell>
                  <TableCell align="left" className={`${s.tableBot} ${s.flex}`}><DeleteIcon className={s.delete} onClick={() => eliminar(user.user)}/></TableCell>
    
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }