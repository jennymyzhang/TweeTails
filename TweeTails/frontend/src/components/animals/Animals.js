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
import { PriorityHigh} from '@mui/icons-material';

const Animals = () => {
  const {
    state: { filteredAnimals },
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
        {filteredAnimals.map((animal) => (
          <Card key={animal._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}

                actionIcon={
                  <Tooltip title={animal.first_name + " " + animal.last_name} sx={{ mr: '5px' }}>
                    <Avatar src={animal.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={animal.images[0]}
                alt={animal.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({type: 'UPDATE_ANIMAL', payload:animal})}
              />
              <ImageListItemBar
                title={animal.title}
                actionIcon={animal.injured && <PriorityHigh sx={{color:"#C40C0C" , fontSize:'40px'}}/> }
              />
            </ImageListItem>
          </Card> 
        ))}
      </ImageList>
    </Container>
  );
};

export default Animals;