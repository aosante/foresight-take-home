import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Controller, useForm } from 'react-hook-form';

import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';

const CreateAppointment = () => {
  const history = useHistory();
  const [appointmentDate, setAppointmentDate] = useState(null);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({ mode: 'onBlur' });
  const { data: patients, status, run } = useAsync();

  const isError = status === 'rejected';

  useEffect(() => {
    run(client('patients'));
  }, [run]);

  const onSubmit = async (data) => {
    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-TOKEN': process.env.REACT_APP_CSRF_TOKEN,
      },
      body: JSON.stringify({ ...data, occurs_at: appointmentDate }),
    };
    try {
      await client('appointments', postConfig);
      history.push('/');
    } catch (error) {
      alert(
        'Something went wrong. Make sure your csrf token is set on env file'
      );
      history.push('/');
    }
  };

  const { ref: typeRef, ...typeRest } = register('type', {
    required: true,
    maxLength: 50,
  });

  return (
    <Container size="sm">
      <Typography variant="h6" component="h2" gutterBottom>
        Create a New Appointment
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {isError && (
          <Typography margin variant="body1" sx={{ color: 'red' }}>
            There was an error loading the patient list. Try refreshing the page
          </Typography>
        )}
        <ReactHookFormSelect
          control={control}
          defaultValue=""
          error={isError}
          id="patient_id"
          label="Choose you patient"
          name="patient_id"
          style={{ dispay: 'block', minWidth: '100%' }}
          variant="outlined"
        >
          {patients?.length &&
            patients.map(({ id, first_name, last_name }) => (
              <MenuItem
                key={id}
                value={id}
              >{`${first_name} ${last_name}`}</MenuItem>
            ))}
        </ReactHookFormSelect>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Appointment Start Time"
            error={true}
            value={appointmentDate}
            onChange={(newValue) => {
              setAppointmentDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          color="primary"
          error={errors && errors.type ? true : false}
          fullWidth
          helperText={
            errors.type && 'You must provide a valid appointment type'
          }
          id="type"
          inputRef={typeRef}
          label="Appointment type"
          name="type"
          required
          sx={{ marginTop: 2, marginBottom: 2 }}
          type="text"
          {...typeRest}
        />
        <Button
          // the date picker and select components need proper validation with the react-hook-form package
          disabled={isError || !isValid || !appointmentDate}
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

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select
            fullWidth
            labelId={labelId}
            label={label}
            sx={{ marginBottom: 2 }}
            {...field}
          >
            {children}
          </Select>
        )}
        control={control}
        defaultValue={defaultValue}
        name={name}
        rules={{ required: true }}
      />
    </FormControl>
  );
};

export default CreateAppointment;
