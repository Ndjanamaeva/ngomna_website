import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Layout from './../components/layout/layout';
import axios from 'axios';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import '../styles/feature.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip

const columns = [
  { id: 'number', label: 'N°', minWidth: 50 },
  { id: 'menuitem', label: 'Menu Item', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 200, align: 'center' },
];

export default function CenteredTable() {
  const [menuItems, setMenuItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ label: '' });
  const [currentEdit, setCurrentEdit] = React.useState(null);

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menuitems/3');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleDelete = async (label) => {
    try {
      await axios.delete(`http://localhost:5000/api/menuitems/label/${label}`);
      setMenuItems(menuItems.filter(item => item.label !== label));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.label.trim()) {
      alert('Label is required');
      return;
    }

    try {
      const newMenuItem = { label: formData.label };
      const response = await axios.post('http://localhost:5000/api/menuitems/3', newMenuItem);
      const { menuItem } = response.data; // Ensure the API returns the new item as 'menuItem'
      setMenuItems([...menuItems, menuItem]); // Update state with the new item

      setOpen(false);
      setFormData({ label: '' });
    } catch (error) {
      console.error('Error adding menu item', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleOpenForm = () => {
    setFormData({ label: '' });
    setOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setCurrentEdit(item);
    setFormData({ label: item.label });
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!formData.label.trim()) {
      alert('Label is required');
      return;
    }

    try {
      const updatedData = { label: formData.label };
      await axios.put(`http://localhost:5000/api/menuitems/label/${currentEdit.label}`, updatedData);

      setMenuItems(menuItems.map(item =>
        item.label === currentEdit.label ? { ...item, label: formData.label } : item
      ));

      setEditOpen(false);
      setCurrentEdit(null);
      setFormData({ label: '' });
    } catch (error) {
      console.error('Error updating menu item:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="heading">
        <h1>CONTACT MENU MANAGEMENT</h1>
      </div>
      <div className="add" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', marginTop: '80px', paddingLeft: '380px' }}>
        <h5>Add a Menu Item Here!</h5>
        <Tooltip title="Add Menu Item">
          <AddBoxIcon
            color="primary"
            size="large"
            sx={{ color: 'green' }}
            onClick={handleOpenForm}
          >
            Add
          </AddBoxIcon>
        </Tooltip>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', marginTop: '20px', padding: '16px' }}>
        <Paper sx={{ width: '100%', maxWidth: 600, overflow: 'hidden' }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, backgroundColor: 'rgb(223, 223, 223)', fontWeight: 'bold' }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.label}>
                    <TableCell>{index + 1}</TableCell> {/* Auto-increment N° */}
                    <TableCell>{item.label}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit Menu Item">
                        <EditIcon
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ color: 'blue', marginRight: '16px' }} // Increased marginRight for more space
                          onClick={() => handleOpenEditForm(item)}
                        >
                          Edit
                        </EditIcon>
                      </Tooltip>
                      <Tooltip title="Delete Menu Item">
                        <DeleteIcon
                          color="primary"
                          size="small"
                          sx={{ color: 'red' }}
                          onClick={() => handleDelete(item.label)}
                        >
                          Delete
                        </DeleteIcon>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Dialog for Add Menu Item */}
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
            onChange={(e) => setFormData({ label: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Edit Menu Item */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Menu Item Label"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.label}
            onChange={(e) => setFormData({ label: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
