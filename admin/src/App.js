//app.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/manager.css';

const App = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingFeature, setEditingFeature] = useState('');

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get('http://localhost:5000/features');
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const addFeature = async () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      try {
        await axios.post('http://localhost:5000/features', { name: newFeature.trim() });
        fetchFeatures();
        setNewFeature('');
      } catch (error) {
        console.error('Error adding feature:', error);
      }
    }
  };

  const deleteFeature = async (index) => {
    const featureToDelete = features[index];
    try {
      await axios.delete(`http://localhost:5000/features/${featureToDelete}`);
      fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingFeature(features[index]);
  };

  const saveEdit = async () => {
    if (editingFeature.trim() && !features.includes(editingFeature.trim())) {
      const featureToUpdate = features[editingIndex];
      try {
        await axios.put(`http://localhost:5000/features/${featureToUpdate}`, { name: editingFeature.trim() });
        fetchFeatures();
        cancelEditing();
      } catch (error) {
        console.error('Error updating feature:', error);
      }
    }
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingFeature('');
  };

  return (
    <div className="App">
      <h1>Admin Dashboard - Features</h1>
      <div className="menu">
        <h2>Menu: Features</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingFeature}
                    onChange={(e) => setEditingFeature(e.target.value)}
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  {feature}
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => deleteFeature(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="add-feature">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add new feature"
          />
          <button onClick={addFeature}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default App;
