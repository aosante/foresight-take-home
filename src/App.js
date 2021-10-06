import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import CreateAppointment from './pages/CreateAppointment';
import CreatePatient from './pages/CreatePatient';
import Layout from './components/Layout';
import Patients from './pages/Patients';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Patients} />
          <Route path="/add-patient" component={CreatePatient} />
          <Route path="/add-appointment" component={CreateAppointment} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
