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
import axios from 'axios';
import '../styles/feature.css';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'menuitem', label: 'Menu Item', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

export default function CenteredTable() {
  const [menuItems, setMenuItems] = React.useState([]);

  // Fetch menu items on component mount
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menuitems'); // Replace with your backend URL
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menuitems/${id}`); // Replace with your backend URL
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <Layout>
      <div className="heading">
        <h1>FEATURES MENU MANAGEMENT</h1> 
      </div>
      <div className="add" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', marginTop: '50px', paddingLeft: '180px' }}>
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
          height: 'calc(100vh - 100px)',
        }}
      >   
        <Paper sx={{ width: '100%', maxWidth: 1000, overflow: 'hidden', height: '100%' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: ' rgb(223, 223, 223)',
                        fontWeight: 'bold'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.label}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" size="small" style={{ marginRight: 8, backgroundColor: ' rgb(75, 75, 75)' }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" style={{ backgroundColor: 'red' }} onClick={() => handleDelete(item.id)}>
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
