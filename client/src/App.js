import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { ForbidenRoute, ProtectedRoute } from './component';
import MainNavigation from './app/navigations/MainNav';
import ConnexionNavigation from './app/navigations/ConnexionNavigation';

function App() {
  return (
    <Router>
      <Switch>
        <ForbidenRoute path="/login" component={ConnexionNavigation} />
        <Route path="/" component={MainNavigation} />
      </Switch>
    </Router>
  );
}

export default App;
