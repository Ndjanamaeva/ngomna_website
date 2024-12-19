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
  const [editMode, setEditMode] = React.useState(false);

  // Fetch links and menus on component mount
  React.useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links');
        // Here, you can generate IDs frontend-side based on current state or using a simple incrementing counter
        const linksWithIds = response.data.map((item, index) => ({
          ...item,
          id: index + 1, // Frontend-generated ID (can be replaced with a more complex ID generator)
        }));
        setLinks(linksWithIds);  // Set links with generated IDs
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/links/${id}`);
      setLinks(links.filter((item) => item.id !== id));  // Remove deleted item from state
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Handle form submission (Add/Edit link)
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
      if (editMode) {
        // Edit request
        await axios.put(`http://localhost:5000/api/links/${formData.id}`, { label: formData.label, menuId: formData.menuId });
        setLinks(links.map((item) => (item.id === formData.id ? { ...item, label: formData.label } : item)));
      } else {
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
        const { link, menuItem, page } = response.data;

        // Generating a unique ID on frontend (in case the backend doesn't provide it)
        const newId = links.length + 1;  // Frontend-generated ID (simple increment)

        // Adding the new link to the state with the generated ID
        setLinks([...links, { id: newId, label: link.label }]);

        // Optional: Log the created MenuItem and Page
        console.log('MenuItem created:', menuItem);
        console.log('Page created:', page);
      }

      // Reset form state
      setOpen(false);
      setFormData({ id: '', label: '', menuId: '' });
      setEditMode(false);
    } catch (error) {
      console.error(editMode ? 'Error updating link' : 'Error adding link', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  // Handle form open for add or edit
  const handleOpenForm = (item = null) => {
    setOpen(true);
    if (item) {
      setEditMode(true);
      setFormData({ id: item.id, label: item.label, menuId: item.menuId });
    } else {
      setEditMode(false);
      setFormData({ id: '', label: '', menuId: '' });
    }
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
          onClick={() => handleOpenForm()}
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
                        color="primary"
                        size="small"
                        style={{ marginRight: 8, backgroundColor: 'rgb(75, 75, 75)' }}
                        onClick={() => handleOpenForm(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ backgroundColor: 'red' }}
                        onClick={() => handleDelete(item.id)}
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

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Link' : 'Add Link'}</DialogTitle>
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
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
