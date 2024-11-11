import React, { useState } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/mainlogo.png';
import '../../styles/header.css';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', overflow: 'hidden' }}>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ height: '130px', width: '130px' }} />
      </Link>
      <Divider />
      <ul className="mobile-navigation">
          <li><a href="/pages">Pages</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/boxes">Boxes</a></li>
          <li><a href="/carousel">Carousel</a></li>
          <li><a href="/links">Links</a></li>
          <li><a href="/comments">Comments</a></li>
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
            <Box sx={{ flexGrow: 1, textAlign: 'center'}}>
              <h1 style={{ marginRight:'200px', color: 'white' }}>ADMIN DASHBOARD</h1>
            </Box>
              <li>
                <Link to="#">
                  <PersonIcon/>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <NotificationsIcon/>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <SettingsIcon/>
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
              width: "120px", 
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
