import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function NutrientTable({nutrientData}) {
  return (
    <TableContainer component={Paper} sx={{maxHeight: 400}}>
      <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell colSpan={2} sx={{backgroundColor: '#a3a3a3'}}>
                  Nutrient Information
                </TableCell>
            </TableRow>
          </TableHead>        
        <TableBody>
          {Object.keys(nutrientData).map((key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f3f3f3' }}}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{nutrientData[key]}</TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}

