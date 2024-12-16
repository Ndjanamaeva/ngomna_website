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

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'link', label: 'Link', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

export default function CenteredTable() {
  const [links, setLinks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ id: '', label: '' });
  const [editMode, setEditMode] = React.useState(false);

  // Fetch links on component mount
  React.useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links');
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/links/${id}`);
      setLinks(links.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Handle form submission for adding/editing links
  const handleSubmit = async () => {
    if (!formData.label.trim()) {
      alert('Label is required');
      return;
    }

    try {
      if (editMode) {
        // Edit request
        await axios.put(`http://localhost:5000/api/links/${formData.id}`, { label: formData.label });
        setLinks(links.map(item => (item.id === formData.id ? { ...item, label: formData.label } : item)));
      } else {
        // Add request - This will create a new link, menu item, and page
        const response = await axios.post(`http://localhost:5000/api/links`, { label: formData.label });
        const newLink = { ...response.data, id: links.length + 1 }; // Assuming backend response includes the new item
        setLinks([...links, newLink]);
      }

      setOpen(false);
      setFormData({ id: '', label: '' });
      setEditMode(false);
    } catch (error) {
      console.error(editMode ? 'Error updating link' : 'Error adding link', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle form open for add or edit
  const handleOpenForm = (item = null) => {
    setOpen(true);
    if (item) {
      setEditMode(true);
      setFormData({ id: item.id, label: item.label });
    } else {
      setEditMode(false);
      setFormData({ id: '', label: '' });
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
                    <TableCell>{item.id}</TableCell>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
