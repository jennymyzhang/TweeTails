import { Box, Drawer, IconButton, styled, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import React from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useValue();
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>Apply Search or Filter:</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={containerRef}></Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;