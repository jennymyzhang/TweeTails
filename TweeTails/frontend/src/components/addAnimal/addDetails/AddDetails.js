import React from 'react';
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Checkbox
} from '@mui/material';
import { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
  const {
    state: {
      details: { title, description, injured },
    },
    dispatch,
  } = useValue();
  const [injuredAnimal, setInjuredAnimal] = useState(injured);

  const handleCheckboxChange = (event) => {
    setInjuredAnimal(event.target.checked );
    dispatch({ type: 'UPDATE_DETAILS', payload: { injured: !injuredAnimal } })
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={injuredAnimal} onChange={handleCheckboxChange} />}
        label="Injured?"
      />
      <InfoField
        mainProps={{ name: 'title', label: 'Title', value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: 'description',
          label: 'Description',
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;