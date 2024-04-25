import React, {useState} from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
import photoURL from '../components/profile.jpeg';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import Sidebar from './sidebar/Sidebar';

const user = { name: 'test', photoURL };

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit" onClick={() => setIsOpen(true)}>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            TweeTails
          </Typography>
          {!currentUser ? (
            <Button
              color="inherit"
              startIcon={<Lock />}
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