import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import './App.css';
import withRoot from './withRoot';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
    render() {
        return (
            <SnackbarProvider maxSnack={3}>
                <BrowserRouter>
                    <React.Fragment>
                        <CssBaseline />
                        <div>
                            <NavBar />
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    component={Dashboard} />
                                <Route
                                    path='/project/:id'
                                    component={ProjectDetails} />
                                <Route
                                    path='/signin'
                                    component={SignIn} />
                                <Route
                                    path='/signup'
                                    component={SignUp} />
                                <Route
                                    path='/create'
                                    component={CreateProject} />
                            </Switch>
                        </div>
                    </React.Fragment>
                </BrowserRouter>
            </SnackbarProvider>
        );

    }
}

export default withRoot(App);