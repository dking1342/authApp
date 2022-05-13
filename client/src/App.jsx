import React, { } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import { UserProvider } from './store/user';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


const App = () => {
  

  return (
    <UserProvider>
    <Router>
        <Header />
        <Route exact path='/' component={Home} />
        <PublicRoute exact path='/register' component={Register} />
        <PublicRoute exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <CssBaseline />
    </Router>
    </UserProvider>
  )
}

export default App
