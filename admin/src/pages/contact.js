import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Layout from './../components/layout/layout';
import '../styles/feature.css';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'menuitem', label: 'Menu Item', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

const rows = [
  { id: 1, menuitem: 'Whatsapp', actions: 'Edit/Delete' },
  { id: 2, menuitem: 'E-mail', actions: 'Edit/Delete' },
  { id: 3, menuitem: 'Facebook', actions: 'Edit/Delete' },
];

export default function CenteredTable() {
  return (
    <Layout>
      <div className="heading">
        <h1>CONTACT MENU MANAGEMENT</h1> 
      </div>
      <div className="add" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', marginTop: '50px', paddingLeft: '380px' }}>
        <h5>Add a Menu Item Here!</h5>
        <Button variant="contained" color="secondary" size="small" sx={{ backgroundColor: 'green' }}>
          Add
        </Button>
      </div>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          marginTop: '20px',
          padding: '16px',
        }}
      >   
        <Paper sx={{ width: '100%', maxWidth: 600, overflow: 'hidden' }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: 'rgb(223, 223, 223)',
                        fontWeight: 'bold'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.menuitem}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" size="small" style={{ marginRight: 8, backgroundColor: 'rgb(75, 75, 75)' }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" style={{ backgroundColor: 'red' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
}
