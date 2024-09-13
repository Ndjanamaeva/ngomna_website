import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/manager.css';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [newMenuTitle, setNewMenuTitle] = useState('');
  const [newMenuItemLabel, setNewMenuItemLabel] = useState('');
  const [editingMenu, setEditingMenu] = useState(null);
  const [editingMenuTitle, setEditingMenuTitle] = useState('');
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [editingMenuItemLabel, setEditingMenuItemLabel] = useState('');
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/menus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const addMenu = async () => {
    if (newMenuTitle.trim()) {
      try {
        await axios.post('http://localhost:5000/menus', { title: newMenuTitle.trim(), menuItems: [] });
        fetchMenus();
        setNewMenuTitle('');
      } catch (error) {
        console.error('Error adding menu:', error);
      }
    }
  };

  const deleteMenu = async (menuId) => {
    try {
      await axios.delete(`http://localhost:5000/menus/${menuId}`);
      fetchMenus();
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const startEditingMenu = (menu) => {
    setEditingMenu(menu);
    setEditingMenuTitle(menu.title);
  };

  const saveMenuEdit = async () => {
    if (editingMenuTitle.trim()) {
      try {
        await axios.put(`http://localhost:5000/menus/${editingMenu.id}`, { title: editingMenuTitle });
        fetchMenus();
        cancelEditingMenu();
      } catch (error) {
        console.error('Error updating menu:', error);
      }
    }
  };

  const cancelEditingMenu = () => {
    setEditingMenu(null);
    setEditingMenuTitle('');
  };

  const addMenuItem = async () => {
    if (newMenuItemLabel.trim() && selectedMenuId) {
      try {
        await axios.post(`http://localhost:5000/menus/${selectedMenuId}/menu-items`, { label: newMenuItemLabel.trim() });
        fetchMenus();
        setNewMenuItemLabel('');
      } catch (error) {
        console.error('Error adding menu item:', error);
      }
    }
  };

  const deleteMenuItem = async (menuId, itemId) => {
    try {
      await axios.delete(`http://localhost:5000/menus/${menuId}/menu-items/${itemId}`);
      fetchMenus();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const startEditingMenuItem = (menuId, item) => {
    setEditingMenuItem({ menuId, item });
    setEditingMenuItemLabel(item.label);
  };

  const saveMenuItemEdit = async () => {
    if (editingMenuItemLabel.trim() && editingMenuItem) {
      try {
        await axios.put(`http://localhost:5000/menus/${editingMenuItem.menuId}/menu-items/${editingMenuItem.item.id}`, { label: editingMenuItemLabel.trim() });
        fetchMenus();
        cancelEditingMenuItem();
      } catch (error) {
        console.error('Error updating menu item:', error);
      }
    }
  };

  const cancelEditingMenuItem = () => {
    setEditingMenuItem(null);
    setEditingMenuItemLabel('');
  };

  return (
    <div className="App">
      <h1>Admin Dashboard - Menus</h1>
      <div className="menu">
        <h2>Menus</h2>
        <input
          type="text"
          value={newMenuTitle}
          onChange={(e) => setNewMenuTitle(e.target.value)}
          placeholder="Add new menu"
        />
        <button onClick={addMenu}>Add Menu</button>

        <ul>
          {menus.map((menu) => (
            <li key={menu.id}>
              {editingMenu && editingMenu.id === menu.id ? (
                <>
                  <input
                    type="text"
                    value={editingMenuTitle}
                    onChange={(e) => setEditingMenuTitle(e.target.value)}
                  />
                  <button onClick={saveMenuEdit}>Save</button>
                  <button onClick={cancelEditingMenu}>Cancel</button>
                </>
              ) : (
                <>
                  {menu.title}
                  <button onClick={() => startEditingMenu(menu)}>Edit</button>
                  <button onClick={() => deleteMenu(menu.id)}>Delete</button>
                  <button onClick={() => setSelectedMenuId(menu.id)}>Manage Items</button>
                </>
              )}

              {selectedMenuId === menu.id && (
                <div className="menu-items">
                  <h3>Menu Items</h3>
                  <input
                    type="text"
                    value={newMenuItemLabel}
                    onChange={(e) => setNewMenuItemLabel(e.target.value)}
                    placeholder="Add new item"
                  />
                  <button onClick={addMenuItem}>Add Item</button>
                  <ul>
                    {menu.menuItems.map((item) => (
                      <li key={item.id}>
                        {editingMenuItem && editingMenuItem.item.id === item.id ? (
                          <>
                            <input
                              type="text"
                              value={editingMenuItemLabel}
                              onChange={(e) => setEditingMenuItemLabel(e.target.value)}
                            />
                            <button onClick={saveMenuItemEdit}>Save</button>
                            <button onClick={cancelEditingMenuItem}>Cancel</button>
                          </>
                        ) : (
                          <>
                            {item.label}
                            <button onClick={() => startEditingMenuItem(menu.id, item)}>Edit</button>
                            <button onClick={() => deleteMenuItem(menu.id, item.id)}>Delete</button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
