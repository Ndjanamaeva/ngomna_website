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
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import '../styles/feature.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip

// Table columns definition
const columns = [
  { id: 'number', label: 'N°', minWidth: 50 }, // N° column
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

  // Handle form submission (Add or Edit link)
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
      let response;
      if (formData.id) {
        // Edit existing link
        response = await axios.put(`http://localhost:5000/api/links/${formData.id}`, {
          label: formData.label,
          menuId: formData.menuId,
        });

        const { link } = response.data;

        // Update the links list with the updated data
        setLinks(links.map(item => (item.id === link.id ? link : item)));
      } else {
        // Add new link
        response = await axios.post('http://localhost:5000/api/links', {
          label: formData.label,
          menuId: formData.menuId,
        });

        const { link } = response.data;
        setLinks([...links, { id: link.id, label: link.label }]);
      }

      setOpen(false);
      setFormData({ id: '', label: '', menuId: '' });
    } catch (error) {
      console.error('Error adding/updating link', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  // Handle form open for add
  const handleOpenForm = () => {
    setOpen(true);
    setFormData({ id: '', label: '', menuId: '' });
  };

  // Handle form open for editing
  const handleEdit = (item) => {
    setFormData({ id: item.id, label: item.label, menuId: item.menuId });
    setOpen(true); // Open the dialog to edit the link
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
          alignItems: 'center', // Ensures vertical alignment with the table
          gap: '10px',
          marginTop: '80px', // Adjusted marginTop to align with the table
          paddingLeft: '280px',
          marginBottom: '-20px'
        }}
      >
        <h5>Add a Link Here!</h5>
        <Tooltip title="Add Link">
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
        <Paper sx={{ width: '100%', maxWidth: 800, overflow: 'hidden', height: '80%' }}> {/* Adjusted maxWidth and height */}
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
                {links.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.label}>
                    <TableCell>{index + 1}</TableCell> {/* Auto-increment N° */}
                    <TableCell>{item.label}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit Link">
                        <EditIcon
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ color: 'blue', marginRight: '20px' }} // Increased marginRight for more space
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </EditIcon>
                      </Tooltip>
                      <Tooltip title="Delete Link">
                        <DeleteIcon
                          color="primary"
                          size="small"
                          sx={{ color: 'red', marginLeft: '20px' }} // Added marginLeft for more space
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

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData.id ? 'Edit Link' : 'Add Link'}</DialogTitle> {/* Change title depending on formData */}
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
            {formData.id ? 'Update' : 'Add'} {/* Change button text depending on formData */}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
