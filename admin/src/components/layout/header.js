import React, { useState } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/mainlogo.png';
import '../../styles/header.css';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', overflow: 'hidden' }}>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ height: '130px', width: '130px' }} />
      </Link>
      <Divider />
      <ul className="mobile-navigation">
        <li><a href="/pages">pages</a></li>
        <li>
          <Link 
            sx={{
              fontSize: 19,
              color: "white", 
              "&:hover": { color: "black" },
              textTransform: 'lowercase',
            }} 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClickMenu}
          >
            menus
          </Link>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu} component={Link} to="/features">
              Features
            </MenuItem>
            <MenuItem onClick={handleCloseMenu} component={Link} to="/about">
              About
            </MenuItem>
            <MenuItem onClick={handleCloseMenu} component={Link} to="/contact">
              Contact
            </MenuItem>
          </Menu>
        </li>
        <li><a href="/boxes">boxes</a></li>
        <li><a href="/carousel">carousel</a></li>
        <li><a href="/links">links</a></li>
        <li><a href="/comments">comments</a></li>
      </ul>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav" sx={{ 
        position: "fixed",
        bgcolor: '#555',   
        flexShrink: 0,
        height: '80px',  
        backdropFilter: 'blur(24px)', 
        border: '1px solid',
        borderColor: 'divider', 
        boxShadow: '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)'
      }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton 
            color="inherit" 
            aria-label="open drawer" 
            edge="start" 
            sx={{ color: "white"}} 
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '150px', width: '150px', marginLeft: '-150px' }} />
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="navigation-menu">
              <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                <h1 style={{ marginRight: '200px', color: 'white' }}>ADMIN DASHBOARD</h1>
              </Box>
              <li>
                <Link to="#">
                  <PersonIcon />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <NotificationsIcon />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <SettingsIcon />
                </Link>
              </li>
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
            "& .MuiDrawer-paper": { 
              boxSizing: "border-box", 
              width: "180px", 
              bgcolor: "#444"
            } 
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