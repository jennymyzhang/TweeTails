import React, {useState} from 'react';
import { createTheme } from '@mui/material/styles';

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Gradient, GradientRounded, Lock, Menu } from '@mui/icons-material';
import photoURL from '../components/profile.jpeg';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import Sidebar from './sidebar/Sidebar';
import { withTheme } from '@emotion/react';


const user = { name: 'test', photoURL };

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppBar elevation={0} sx={{background: '#FFF6DC'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" onClick={() => setIsOpen(true)}>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h4"
            component="h4"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontFamily: 'Luminari, fantasy', color: '#3C2A21', fontWeight: 'bold', fontsize: '50px'}}
          >
            TweeTails
          </Typography>
          {!currentUser ? (
            <Button 
              startIcon={<Lock color='#3C2A21'/>}
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
            >
              Login
            </Button>
          ) : (
            <UserIcons />
          )}
        </Toolbar>
      </Container>
      <Sidebar {...{ isOpen, setIsOpen }} />
    </AppBar>
  );
};

export default NavBar;