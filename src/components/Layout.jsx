import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Box, Button, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Avatar component={Link} to="/" src={'/fs-logo.jpeg'} />
          </Box>
          <Button component={Link} to="/" color="secondary">
            Patients
          </Button>
          <Button component={Link} to="/add-patient" color="secondary">
            <AddIcon />
            Patient
          </Button>
          <Button component={Link} to="/add-appointment" color="secondary">
            <AddIcon />
            Appointment
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.page}>
        <div></div>
        {children}
      </div>
    </>
  );
};

export default Layout;
