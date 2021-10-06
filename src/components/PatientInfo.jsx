import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';

import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';
import { formatDate, getInitials } from '../utils/utility';

const useStyles = makeStyles(() => ({
  appointmentBox: {
    marginBottom: '1em',
  },
  dialogTitle: {
    backgroundColor: grey[200],
    borderBottom: `2px solid ${grey[400]}`,
  },
  closeBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
}));

const PatientInfo = ({ isOpen, onClose, patient, patientId }) => {
  const classes = useStyles();
  const { id, dob, first_name, last_name, phone, bgcolor } = patient;
  const { data, status, run } = useAsync();

  const isError = status === 'rejected';
  const isLoading = status === 'pending';
  const isSuccess = status === 'resolved';

  useEffect(() => {
    run(
      client(
        `appointments?patient_id=${encodeURIComponent(
          id
        )}&order_by=occurs_at_DESC`
      )
    );
  }, [id, run]);

  return (
    <Dialog
      aria-labelledby="patient-dialog"
      fullWidth
      open={isOpen && patientId === id}
      onClose={onClose}
    >
      <DialogTitle className={classes.dialogTitle} id="patient-dialog">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor }}>
              {getInitials(first_name, last_name)}
            </Avatar>
          }
          title={
            <Typography gutterBottom variant="h6">
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
        {onClose && (
          <IconButton
            aria-label="close"
            className={classes.closeBtn}
            onClick={onClose}
            sx={{ position: 'absolute' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : isError ? (
          <Typography variant="body1">
            Something went wrong. Try refreshing the page.
          </Typography>
        ) : isSuccess ? (
          data?.length ? (
            data.map(({ id: appointmentId, occurs_at, type }) => (
              <Box
                className={classes.appointmentBox}
                key={appointmentId}
                sx={{ borderBottom: 1 }}
              >
                <Typography gutterBottom variant="body1">
                  {formatDate(occurs_at)}
                </Typography>
                <Typography gutterBottom variant="body2">
                  {type}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No appointments found...</Typography>
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default PatientInfo;
