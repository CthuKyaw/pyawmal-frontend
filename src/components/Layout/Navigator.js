import * as React from 'react';

import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import MoreVert from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/VideoCall';
import LogoutIcon from '@mui/icons-material/Logout';
import { deepOrange, grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Chip, Stack } from '@mui/material';
import { useAuth } from '../../context/auth-context';
import CompanyLogo from './CompanyLogo'
import { useLocation } from 'react-router-dom';
//#f7bf50
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  flexDirection: 'row',
  justifyContent: 'space-between',

}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logout, loggedIn, getCurrentUser} = useAuth();
  const [profileInfo, setProfileInfo] = useState();
  const [show,showShow] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentPath, setCurrentPath] = React.useState(null);
  let location = useLocation();

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () =>{
    handleDrawerClose();//DrawerMenu
    handleClose();//MoreVert Menu
    logout();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let path = location.pathname;
    if(path){
      setCurrentPath(path.substring(0,5));
    }
    let user = getCurrentUser();
    if (user) {
      setProfileInfo(`${user.data.user_name} (${user.data.role < 2 ? "Admin" : "User"})`);
    }
  }, [])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  function logoutClickHandler() {
    logout();
  }

  function handleMenuClick() {
    setOpen(false);
  }

  return (
    <>
    {currentPath != "/room" ? 
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {loggedIn && <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{ color: '#223466' }} />
          </IconButton>}
          <CompanyLogo />
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }} component="div">
            Pyawmal.com
          </Typography>

          
          <div>
          {loggedIn &&
              <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVert sx={{ color: '#223466' }} />

              </IconButton>

          }
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >

              <MenuItem onClick={() => { handleLogout() }}>Log out</MenuItem>
            </Menu>

          </div>
        </Toolbar>
      </AppBar>
      {loggedIn && 
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            backgroundColor: '#364544'
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Button>
              <Chip className="avatarHover" label={getCurrentUser().data?.user_name}
                sx={{ bgcolor: '#d29f2b', color: grey[100] }}>
              </Chip>
            </Button>

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: '#fff' }} /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}
                onClick={handleMenuClick}>Dashboard</Link>

            </ListItem>
            {getCurrentUser().data.role < 2 &&
              <ListItem button>
                <ListItemIcon>
                  <PersonAddIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <Link to="/create" style={{ textDecoration: 'none', color: 'white' }}
                  onClick={handleMenuClick}>Create Account</Link>

              </ListItem>}

            <ListItem button>
              <ListItemIcon>
                <MessageIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <Link to="/chatroom" style={{ textDecoration: 'none', color: 'white' }}
                onClick={handleMenuClick}>Chat Room</Link>

            </ListItem>
          </List>

          <Divider />
          <List sx={{ pt: 5 }}>

            <ListItem button>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <Button onClick={() => { handleLogout() }} sx={{ color: 'white' }}>Log Out</Button>
            </ListItem>

          </List>

        </Drawer>
      }
      
        <Main open={open}>
          <DrawerHeader />

        </Main>
      
    </Box>
    : <div></div>}
    </>
  );
}
