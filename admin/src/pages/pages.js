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
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import '../styles/feature.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const columns = [
  { id: 'number', label: 'N°', minWidth: 50 },
  { id: 'pages', label: 'Pages', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150, align: 'center' },
];

export default function FeaturesPage() {
  const [pages, setPages] = React.useState([]); // Change here
  const [editOpen, setEditOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ label: '', contentType: '' });
  const [currentEdit, setCurrentEdit] = React.useState(null);
  const [textEditOpen, setTextEditOpen] = React.useState(false);
  const [imageEditOpen, setImageEditOpen] = React.useState(false);
  const [videoEditOpen, setVideoEditOpen] = React.useState(false); // New state for video editing
  const [textData, setTextData] = React.useState({ title: '', description: '' });
  const [images, setImages] = React.useState([]);
  const [imageLink, setImageLink] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);
  const [videos, setVideos] = React.useState([]); // State to hold videos
  const [videoLink, setVideoLink] = React.useState(''); // State for video link
  const [videoFile, setVideoFile] = React.useState(null); // State for uploaded video
  const [successMessage, setSuccessMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Fetch pages
  React.useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pages'); // Change endpoint to fetch pages
        setPages(response.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
    fetchPages();
  }, []);

  // Handle form submit (edit only)
  const handleEditSubmit = async () => {
    if (!formData.label.trim() || !formData.contentType) {
      alert('Label and content type are required');
      return;
    }

    try {
      const updatedData = { label: formData.label, contentType: formData.contentType };
      await axios.put(`http://localhost:5000/api/pages/label/${currentEdit.label}`, updatedData); // Update endpoint

      setPages(pages.map(item =>
        item.label === currentEdit.label ? { ...item, label: formData.label, contentType: formData.contentType } : item
      ));

      setEditOpen(false);
      setCurrentEdit(null);
      setFormData({ label: '', contentType: '' });
    } catch (error) {
      console.error('Error updating page:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle open form for editing
  const handleOpenEditForm = (item) => {
    setCurrentEdit(item);
    setFormData({ label: item.name, contentType: item.contentType || '' });
    setEditOpen(true);
  };

  // Fetch text data for a page
  const fetchTextData = async (pageId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/text/${pageId}`);
      setTextData({ title: response.data.title, description: response.data.content });
    } catch (error) {
      console.error('Error fetching text data:', error);
      setTextData({ title: '', description: '' });
    }
  };

  // Fetch images
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images'); // Adjust the endpoint accordingly
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos'); // Adjust the endpoint accordingly
      setVideos(response.data); // Assuming the response contains an array of video URLs
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Handle content type change
  const handleContentTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({ ...formData, contentType: selectedType });
  };

  // Add a new function to handle 'Next' after content type selection
  const handleContentTypeNext = () => {
    if (formData.contentType === 'text') {
      if (currentEdit && currentEdit.id) {
        fetchTextData(currentEdit.id);
      }
      setTextEditOpen(true);
    } else if (formData.contentType === 'image') {
      setImageEditOpen(true);
      fetchImages();
    } else if (formData.contentType === 'video') {
      setVideoEditOpen(true);
      fetchVideos();
    }
    setEditOpen(false);
  };

  // Handle text submission
  const handleTextSubmit = async () => {
    if (!currentEdit || !currentEdit.id) {
      alert('No page selected.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/text/${currentEdit.id}`, {
        title: textData.title,
        content: textData.description,
      });
      setTextEditOpen(false);
      setTextData({ title: '', description: '' });
      setSuccessMessage('Text content updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating text data:', error);
      alert('Failed to update text content.');
    }
  };

  // Handle image submission
  const handleImageSubmit = async () => {
    if (imageLink) {
      console.log('Image Link:', imageLink);
      // Save the image link logic here
    }

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      // Upload the image logic here
      console.log('Image File:', imageFile);
    }

    setImageEditOpen(false);
    setImageLink('');
    setImageFile(null);
  };

  // Handle video submission
  const handleVideoSubmit = async () => {
    if (videoLink) {
      console.log('Video Link:', videoLink);
      // Save the video link logic here
    }

    if (videoFile) {
      const formData = new FormData();
      formData.append('video', videoFile);
      // Upload the video logic here
      console.log('Video File:', videoFile);
    }

    setVideoEditOpen(false);
    setVideoLink('');
    setVideoFile(null);
  };

  return (
    <Layout>
      <div className="heading">
        <h1>PAGE CONTENT MANAGEMENT</h1>
      </div>
      <div className="instructions marquee" style={{ marginTop: '50px', marginBottom: '50px', paddingLeft: '280px' }}>
        <h5>Modify page content here! Click on Edit to modify the content on the page selected.</h5>
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
        <Paper sx={{ width: '100%', maxWidth: 800, overflow: 'hidden', height: '100%' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: 'rgb(223, 223, 223)', fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pages.map((item, index) => ( // Change here
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.label}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell> {/* Change here to display page name */}
                    <TableCell align="center">
                      <Tooltip title="Edit Page Content"> {/* Add Tooltip */}
                        <EditIcon
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ color: 'blue' }}
                          style={{ marginRight: '8px' }}
                          onClick={() => handleOpenEditForm(item)}
                        >
                          Edit
                        </EditIcon>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      {/* Dialog for Edit Page */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Select the page content to edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Page Label"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.label}
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Content Type</InputLabel>
            <Select
              value={formData.contentType}
              onChange={handleContentTypeChange}
              label="Content Type"
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="video">Video</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleContentTypeNext} color="primary">Next</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Text Editing */}
      <Dialog open={textEditOpen} onClose={() => setTextEditOpen(false)}>
        <DialogTitle>Edit Text Content</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={textData.title}
            onChange={(e) => setTextData({ ...textData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={textData.description}
            onChange={(e) => setTextData({ ...textData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTextEditOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleTextSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Image Editing */}
      <Dialog open={imageEditOpen} onClose={() => setImageEditOpen(false)}>
        <DialogTitle>Edit Image Content</DialogTitle>
        <DialogContent>
          <div>
            <h4>Available Images:</h4>
            {images.map((img, index) => (
              <img key={index} src={img} alt={`{index}`} style={{ width: '100px', margin: '5px' }} />
            ))}
          </div>
          <TextField
            margin="dense"
            label="Image Link"
            type="text"
            fullWidth
            variant="outlined"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageEditOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleImageSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Video Editing */}
      <Dialog open={videoEditOpen} onClose={() => setVideoEditOpen(false)}>
        <DialogTitle>Edit Video Content</DialogTitle>
        <DialogContent>
          <div>
            <h4>Available Videos:</h4>
            {videos.map((vid, index) => (
              <video key={index} controls style={{ width: '100px', margin: '5px' }}>
                <source src={vid} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
          <TextField
            margin="dense"
            label="Video Link"
            type="text"
            fullWidth
            variant="outlined"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoEditOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleVideoSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Layout>
  );
}
