import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomeView from './components/HomeView/HomeView';
import OracleView from './components/OracleView/OracleView';
import CardArchiveView from './components/CardArchiveView/CardArchiveView';
import RandomCardView from './components/RandomCardView/RandomCardView';
import CreateCardView from './components/CreateCardView/CreateCardView';

import './styles/main.css';
import AddPlaceView from './components/AddPlaceView/AddPlaceView';

const App = () => (
  <div>
    <Router>
      <div>
        <Header  />
        {/* title="Culture Shift Oracle" */}

        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={HomeView}
        />
         <Route
          path="/login"
          component={LoginPage}
        />
        <Route  
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={HomeView}
        />
        <Route
          path="/oracle"
          component={OracleView}
        />

        <Route
          path="/addplace"
          component={AddPlaceView}
        />
       
          <Route
          path="/cardarchive"
          component={CardArchiveView}
        />
         <Route
          path="/randomcard"
          component={RandomCardView}
        />
         <Route
          path="/createcard"
          component={CreateCardView}
        />
        {/* OTHERWISE (no path!) }
        <Route render={() => <h1>404</h1>} />}*/}

      </div>
    </Router>
  </div>
);

export default App;
