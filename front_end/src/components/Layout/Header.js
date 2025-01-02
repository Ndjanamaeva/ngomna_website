import React, { useState, useCallback } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/ngomna_logo.png';
import '../../styles/Header.css';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState('english');
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = useCallback(async (menuId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menuitems/${menuId}`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const handleMenuClick = (event, menuId) => {
    setAnchorEl(event.currentTarget);
    fetchMenuItems(menuId); // Fetch menu items for the selected menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'english' ? 'french' : 'english'));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ height: '100px', width: '100px' }} />
      </Link>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuClick(e, 1)} // Features menu ID
          >
            Features
          </Link>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
                onClick={handleMenuClose}
              >
                <Link className="menu-item-link" to={item.link}>{item.label}</Link>
              </MenuItem>
            ))}
          </Menu>
        </li>
        <li>
          <Link
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuClick(e, 2)} // About menu ID
          >
            About
          </Link>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
                onClick={handleMenuClose}
              >
                <Link className="menu-item-link" to={item.link}>{item.label}</Link>
              </MenuItem>
            ))}
          </Menu>
        </li>
        <li>
          <Link
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuClick(e, 3)} // Contact menu ID
          >
            Contact
          </Link>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
                onClick={handleMenuClose}
              >
                <Link className="menu-item-link" to={item.link}>{item.label}</Link>
              </MenuItem>
            ))}
          </Menu>
        </li>
      </ul>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav" sx={{ 
        position: "fixed",
        bgcolor: 'rgba(255, 255, 255, 0.4)',   
        flexShrink: 0,
        height: '80px',  
        backdropFilter: 'blur(24px)', 
        border: '1px solid',
        borderColor: 'divider', 
        boxShadow: '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)'
      }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '145px', width: '145px' }} />
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="navigation-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuClick(e, 1)} // Features menu ID
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  Features
                  {Boolean(anchorEl) ? <ArrowDropUpIcon sx={{ color: "black" }} /> : <ArrowDropDownIcon sx={{ color: "black" }} />}
                </Link>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
                      onClick={handleMenuClose}
                    >
                      <Link className="menu-item-link" to={item.link}>{item.label}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </li>
              <li>
                <Link
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuClick(e, 2)} // About menu ID
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  About
                  {Boolean(anchorEl) ? <ArrowDropUpIcon sx={{ color: "black" }} /> : <ArrowDropDownIcon sx={{ color: "black" }} />}
                </Link>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
                      onClick={handleMenuClose}
                    >
                      <Link className="menu-item-link" to={item.link}>{item.label}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </li>
              <li>
                <Link
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuClick(e, 3)} // Contact menu ID
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  Contact
                  {Boolean(anchorEl) ? <ArrowDropUpIcon sx={{ color: "black" }} /> : <ArrowDropDownIcon sx={{ color: "black" }} />}
                </Link>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
                      onClick={handleMenuClose}
                    >
                      <Link className="menu-item-link" to={item.link}>{item.label}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </li>
              <li>
                <Link onClick={toggleLanguage}>{language === 'english' ? 'French' : 'English'}</Link>
              </li>
              <Link to="/download">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    flexShrink: 0,
                    borderRadius: 2,
                    fontFamily: "Arial",
                    fontSize: '17px',
                    background: 'linear-gradient(#001F0E, #00FF66)',
                    color: "white",
                    "&:hover": {
                      background: 'linear-gradient(#001F0E, #00FF66)',
                      boxShadow: "0px 4px 20px rgba(173, 255, 47, 0.5)"
                    }
                  }}
                >
                  DOWNLOAD
                </Button>
              </Link>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "120px" }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ p: 2 }}></Box>
      <Toolbar />
    </Box>
  );
};

export default Header;
