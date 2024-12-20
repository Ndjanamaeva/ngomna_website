// about.js
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
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import '../styles/feature.css';

// Define columns with ID column for frontend-generated IDs
const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },  // Frontend-generated ID column
  { id: 'menuitem', label: 'Menu Item', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

export default function CenteredTable() {
  const [menuItems, setMenuItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ label: '' });

  // Fetch menu items on component mount
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menuitems/2');
        // Adding a frontend-generated ID to each item
        const itemsWithId = response.data.map((item, index) => ({
          ...item,
          id: index + 1,  // Generating a unique ID on the frontend (you can use another method if preferred)
        }));
        setMenuItems(itemsWithId);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle delete action
  const handleDelete = async (label) => {
    try {
      await axios.delete(`http://localhost:5000/api/menuitems/label/${label}`);
      setMenuItems(menuItems.filter(item => item.label !== label));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  // Handle form submission for adding menu items
  const handleSubmit = async () => {
    if (!formData.label.trim()) {
      alert('Label is required');
      return;
    }

    try {
      // Add request
      const response = await axios.post(`http://localhost:5000/api/menuitems/2`, {
        label: formData.label,
        pageId: null,
      });
      // After adding, update the frontend with the new data including a generated ID
      const newItem = { ...response.data, id: menuItems.length + 1 };  // Assign a new frontend ID
      setMenuItems([...menuItems, newItem]);
      setOpen(false);
      setFormData({ label: '' });
    } catch (error) {
      console.error('Error adding menu item', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle form open for add
  const handleOpenForm = () => {
    setFormData({ label: '' });
    setOpen(true);
  };

  return (
    <Layout>
      <div className="heading">
        <h1>ABOUT MENU MANAGEMENT</h1>
      </div>
      <div
        className="add"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
          marginTop: '50px',
          paddingLeft: '380px',
        }}
      >
        <h5>Add a Menu Item Here!</h5>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{ backgroundColor: 'green' }}
          onClick={handleOpenForm}
        >
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
                        fontWeight: 'bold',
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
                    <TableCell>{item.id}</TableCell> {/* Display frontend-generated ID */}
                    <TableCell>{item.label}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ backgroundColor: 'red' }}
                        onClick={() => handleDelete(item.label)}
                      >
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

      {/* Add Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Menu Item Label"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
