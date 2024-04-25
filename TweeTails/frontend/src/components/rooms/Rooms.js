import React from 'react';

import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { StarBorder } from '@mui/icons-material';

const Rooms = () => {
  const {
    state: { filteredRooms },
    dispatch
  } = useValue();
  return (
    <Container >
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          pt: 10,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {filteredRooms.map((room) => (
          <Card key={room._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}

                actionIcon={
                  <Tooltip title={room.uName} sx={{ mr: '5px' }}>
                    <Avatar src={room.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={room.images[0]}
                alt={room.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({type: 'UPDATE_ROOM', payload:room})}
              />
              <ImageListItemBar
                title={room.title}
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Rooms;