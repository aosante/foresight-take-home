import { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { blue, green, grey, orange, purple, red } from '@mui/material/colors';

import Patient from '../components/Patient';
import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';
import { randomColor } from '../utils/utility';

const ICON_COLORS = [blue, green, grey, orange, purple, red];

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  item: {
    display: 'flex',
  },
  loader: {
    textAlign: 'center',
  },
}));

const Patients = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [queried, setQueried] = useState(false);
  const { data, status, run } = useAsync();

  const isError = status === 'rejected';
  const isLoading = status === 'pending';
  const isSuccess = status === 'resolved';

  useEffect(() => {
    if (!queried) {
      run(client('patients'));
      return;
    }
    run(client(`patients?query=${encodeURIComponent(query)}`));
    // clean up to avoid memory leaks
    return () => {
      setQuery();
      setQueried();
    };
  }, [run, queried, query]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  };

  const onClear = (event) => {
    if (event.key === 'Escape') {
      run(client('patients'));
      document.activeElement.blur();
    }
  };

  // this function has been memoized because the patient list can get big
  // resulting in an expensive operation which doesn't need to be computed on every render if patient list hasn't changed
  const memoizedPatients = useMemo(() => {
    if (data) {
      return data.map((patient) => ({
        bgcolor: randomColor(ICON_COLORS)[500],
        ...patient,
      }));
    }
  }, [data]);

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          color="primary"
          className={classes.search}
          fullWidth
          id="search"
          label="Search for patient"
          onKeyUp={onClear}
          type="search"
          sx={{ marginBottom: 2 }}
          variant="filled"
        />
      </form>
      {isLoading && (
        <div className={classes.loader}>
          <CircularProgress sx={{ textAlign: 'center' }} color="primary" />
        </div>
      )}
      <Grid className={classes.container} container spacing={1}>
        {isError ? (
          <Typography variant="h6">
            Somthing went wrong. Try refreshing the page
          </Typography>
        ) : isSuccess ? (
          data?.length ? (
            memoizedPatients.map((patient) => (
              <Grid
                className={classes.item}
                item
                key={patient.id}
                md={3}
                xs={12}
              >
                <Patient patient={patient} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No patients found...</Typography>
          )
        ) : null}
      </Grid>
    </>
  );
};

export default Patients;
