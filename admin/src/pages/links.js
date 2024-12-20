// links.js
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
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '../styles/feature.css';

// Table columns definition
const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },  // ID column
  { id: 'link', label: 'Link', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

export default function CenteredTable() {
  const [links, setLinks] = React.useState([]);
  const [menus, setMenus] = React.useState([]); // State to hold menus
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ id: '', label: '', menuId: '' });

  // Fetch links and menus on component mount
  React.useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links');
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menus'); // Assuming this endpoint returns all menus
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchLinks();
    fetchMenus();
  }, []);


  // Handle delete action
  const handleDelete = async (label) => {
    try {
      await axios.delete(`http://localhost:5000/api/links/label/${label}`);
      setLinks(links.filter(item => item.label !== label));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Handle form submission (Add link)
  const handleSubmit = async () => {
    if (!formData.label.trim()) {
      alert('Label is required');
      return;
    }

    if (!formData.menuId) {
      alert('Please select a menu');
      return;
    }

    try {
      // Add request - This will create a new link, menu item, and page
      const response = await axios.post('http://localhost:5000/api/links', {
        label: formData.label,
        menuId: formData.menuId, // Pass the selected menuId
      });

      // Check if the response contains the necessary data
      if (!response.data.link || !response.data.menuItem || !response.data.page) {
        throw new Error('Invalid response structure');
      }

      // Extracting the new link, MenuItem, and Page from the response
      const { link} = response.data;

      // Adding the new link to the state with the generated ID
      setLinks([...links, { id: link.id, label: link.label }]);

      // Reset form state
      setOpen(false);
      setFormData({ id: '', label: '', menuId: '' });
    } catch (error) {
      console.error('Error adding link', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  // Handle form open for add
  const handleOpenForm = () => {
    setOpen(true);
    setFormData({ id: '', label: '', menuId: '' });
  };

  return (
    <Layout>
      <div className="heading">
        <h1>LINKS MENU MANAGEMENT</h1>
      </div>
      <div
        className="add"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
          marginTop: '50px',
          paddingLeft: '180px',
        }}
      >
        <h5>Add a Link Here!</h5>
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
                {links.map((item) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>{item.id}</TableCell>  {/* Display the frontend-generated ID */}
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
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Link Label"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Menu</InputLabel>
            <Select
              value={formData.menuId}
              onChange={(e) => setFormData({ ...formData, menuId: e.target.value })}
              label="Menu"
            >
              {menus.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                  {menu.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
