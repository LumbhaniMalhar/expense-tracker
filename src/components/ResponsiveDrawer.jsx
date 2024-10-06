import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box,
  useTheme, useMediaQuery, IconButton, AppBar
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';
import { menuItems } from '../utils/constants';

const drawerWidth = 240;

const ResponsiveDrawer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (path) => {
    if (isMobile) {
      setMobileOpen(false);
    }
    navigate(path);
  };

  const drawer = (
    <Box sx={{
      height: '100%',
      backgroundColor: '#19346b',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Toolbar sx={{ justifyContent: 'flex-start', px: 2 }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: 'white' }}>
          Expense Tracker
        </Typography>
      </Toolbar>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" sx={{ color: '#ffffffb3' }}>MENU</Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <motion.div
            key={item.text}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ListItem
              button
              onClick={() => handleItemClick(item.path)}
              selected={location.pathname === item.path}
              sx={{
                cursor: 'pointer',
                backgroundColor: location.pathname === item.path ? '#ffffff1a' : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname !== item.path ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                },
                mx: 1,
                my: 0.5,
                borderRadius: '4px',
                transition: 'background-color 0.3s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: 'white',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  },
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Developed by Malhar
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: '#19346b',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <Box component="img" src="/hybrid-financial.webp" alt="Company Logo" sx={{ height: 40 }} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default ResponsiveDrawer;