import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import PatientInfo from './PatientInfo';
import { getInitials } from '../utils/utility';

const useStyles = makeStyles(() => ({
  patientCard: {
    minWidth: '100%',
  },
  patientName: {
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale3d(1.02, 1.02, 1)',
      transition: 'transform 0.25s',
    },
  },
}));

const Patient = ({ patient }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState();

  const handleOpen = (id) => {
    setPatientId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setPatientId();
    setOpen(false);
  };

  const { id, dob, first_name, last_name, phone, bgcolor } = patient;
  return (
    <Card className={classes.patientCard} elevation={3}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor }}>{getInitials(first_name, last_name)}</Avatar>
        }
        title={
          <Typography
            className={classes.patientName}
            gutterBottom
            onClick={() => handleOpen(id)}
            variant="h6"
          >
            {`${first_name} ${last_name}`}
          </Typography>
        }
      />
      <CardContent>
        <Typography color="textSecondary" variant="body2">
          {dob}
        </Typography>
        <Typography variant="body">{phone}</Typography>
      </CardContent>
      <PatientInfo
        isOpen={open}
        onClose={handleClose}
        patientId={patientId}
        patient={patient}
      />
    </Card>
  );
};

export default Patient;
