import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function View({ events }: any) {

    console.log(events, "events")

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Date</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Colour</TableCell>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Rank_Num</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events?.data?.celebrations?.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                 <TableCell align="center">{events?.data?.date}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.colour}</TableCell>
              <TableCell align="center">{row.rank}</TableCell>
              <TableCell align="center">{row.rank_num}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}