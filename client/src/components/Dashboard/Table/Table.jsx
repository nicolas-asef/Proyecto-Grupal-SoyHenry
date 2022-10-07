import s from "./Table.module.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const rows = [
    {
        id: 123456,
        workerName: "Nicolas",
        userName: "Melina",
        date: "24/08/2022",
        status: "In Progress"
    },
    {
        id: 123321,
        workerName: "Martin",
        userName: "Micaela",
        date: "12/09/2022",
        status: "In Progress"
    },
    {
        id: 321232,
        workerName: "Marcos",
        userName: "Damian",
        date: "01/04/2022",
        status: "Finish"
    },
    {
        id: 312333,
        workerName: "Juan",
        userName: "Marcelo",
        date: "02/10/2022",
        status: "In Progress"
    },
    {
        id: 192132,
        workerName: "Nicolas",
        userName: "Micaela",
        date: "07/08/2022",
        status: "cancel"
    }
];


export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell className={s.tableCell}>Worker</TableCell>
            <TableCell className={s.tableCell}>User</TableCell>
            <TableCell className={s.tableCell}>Date</TableCell>
            <TableCell className={s.tableCell}>Status</TableCell>
            <TableCell className={s.tableCell}>Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell className={s.tableCell}>{row.workerName}</TableCell>
              <TableCell className={s.tableCell}>{row.userName}</TableCell>
              <TableCell className={s.tableCell}>{row.date}</TableCell>
              <TableCell className={s.tableCell}>{row.status}</TableCell>
              <TableCell className={s.tableCell}>Show details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}