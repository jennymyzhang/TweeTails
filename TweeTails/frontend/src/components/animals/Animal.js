import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
  } from '@mui/material';
  import { forwardRef, useEffect, useState } from 'react';
  import { useValue } from '../../context/ContextProvider';
  import { Close, PriorityHigh} from '@mui/icons-material';
  
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation, Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/zoom';
  import './swiper.css';
  
  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
  
  const Animal = () => {
    const {
      state: { animal },
      dispatch,
    } = useValue();
  
    const [place, setPlace] = useState(null);
  
    useEffect(() => {
      if (animal) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${animal.lng},${animal.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlace(data.features[0]));
      }
    }, [animal]);
  
    const handleClose = () => {
      dispatch({ type: 'UPDATE_ANIMAL', payload: null });
    };
    return (
      <Dialog
        fullScreen
        open={Boolean(animal)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} position="relative" sx={{background:'#FFF6DC'}}>
          <Toolbar>
            <Typography variant="h6" component="h3" sx={{ color: '#3C2A21', ml: 2, flex: 1 }}>
              {animal?.title}
            </Typography>
            <IconButton color='#3C2A21' onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ pt: 5}}>
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
            centeredSlides
            slidesPerView={2}
            grabCursor
            navigation
            color='#3C2A21'
            autoplay
            lazy
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {animal?.images?.map((url) => (
              <SwiperSlide key={url}>
                <div className="swiper-zoom-container">
                  <img src={url} alt="animal" />
                </div>
              </SwiperSlide>
            ))}
            <Tooltip
              title={animal?.uName || ''}
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                zIndex: 2,
              }}
            >
              <Avatar src={animal?.uPhoto} />
            </Tooltip>
          </Swiper>
          <Stack sx={{ p: 3 }} spacing={2}>
            {animal?.injured &&
              <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
                <Box>
                <PriorityHigh sx={{color:"#C40C0C" , fontSize:'40px'}}/>
                </Box>
                <Box>
                <Typography variant="h6" component="span">
                  {"This animal is injured, please contact animal rescue ASAP"}
                </Typography>
                </Box>
              </Stack>
            }
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Last Found At: '}
                </Typography>
                <Typography component="span">{place?.text}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="span">
                  {'Address: '}
                </Typography>
                <Typography component="span">{place?.place_name}</Typography>
              </Box>
            </Stack>
            <Stack>
              <Typography variant="h6" component="span">
                {'Details: '}
              </Typography>
              <Typography component="span">{animal?.description}</Typography>
            </Stack>
          </Stack>
        </Container>
      </Dialog>
    );
  };
  
  export default Animal;