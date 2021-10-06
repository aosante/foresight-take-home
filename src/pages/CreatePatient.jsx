import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useForm } from 'react-hook-form';

import { client } from '../utils/api-client';

const CreatePatient = () => {
  const history = useHistory();
  const [dob, setDob] = useState(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-TOKEN': process.env.REACT_APP_CSRF_TOKEN,
      },
      body: JSON.stringify({ ...data, dob }),
    };
    try {
      await client('patients', postConfig);
      history.push('/');
    } catch (error) {
      alert(
        'Something went wrong. Make sure your csrf token is set on env file'
      );
      history.push('/');
    }
  };

  const { ref: firstNameRef, ...firstNameRest } = register('first_name', {
    required: true,
    minLength: 2,
    maxLength: 100,
  });
  const { ref: lastNameRef, ...lastNameRest } = register('last_name', {
    required: true,
    minLength: 2,
    maxLength: 100,
  });
  const { ref: phoneRef, ...phoneRest } = register('phone', {
    required: true,
    minLength: 7,
    maxLength: 25,
  });

  return (
    <Container size="sm">
      <Typography variant="h6" component="h2" gutterBottom>
        Create a New Patient
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          color="primary"
          error={errors && errors.first_name ? true : false}
          fullWidth
          helperText={
            errors.first_name && 'You must provide a valid first name'
          }
          id="first_name"
          inputRef={firstNameRef}
          label="First Name"
          name="first_name"
          required
          sx={{ marginBottom: 2 }}
          type="text"
          {...firstNameRest}
        />
        <TextField
          color="primary"
          error={errors && errors.last_name ? true : false}
          fullWidth
          helperText={errors.last_name && 'You must provide a valid last name'}
          id="last_name"
          inputRef={lastNameRef}
          label="Last Name"
          name="last_name"
          required
          sx={{ marginBottom: 2 }}
          type="text"
          {...lastNameRest}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            error={true}
            value={dob}
            onChange={(newValue) => {
              setDob(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          color="primary"
          error={errors && errors.phone ? true : false}
          fullWidth
          helperText={errors.phone && 'You must provide a valid phone number'}
          id="phone"
          inputRef={phoneRef}
          label="Phone Number"
          name="phone"
          required
          sx={{ marginTop: 2, marginBottom: 2 }}
          type="tel"
          {...phoneRest}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowRightIcon />}
          sx={{ color: '#fff' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreatePatient;
