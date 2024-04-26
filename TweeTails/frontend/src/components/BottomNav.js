import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Paper,
} from '@mui/material';
import { AddLocationAlt, Pets, LocationOn } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import ClusterMap from './map/ClusterMap';
import Animals from './animals/Animals';
import AddAnimal from './addAnimal/AddAnimal';
import Protected from './protected/Protected';

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);
  return (
    <Box ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Animals />,
          2: (
            <Protected>
              <AddAnimal setPage={setValue} />
            </Protected>
          ),
        }[value]
      }
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          sx={{color: 'black', background: '#FFF6DC'}}
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Map" icon={<LocationOn />} />
          <BottomNavigationAction label="Spotted Animals" icon={<Pets />} />
          <BottomNavigationAction label="Found an Animal?" icon={<AddLocationAlt />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;