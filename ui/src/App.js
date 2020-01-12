import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopBar from './components/TopBar';
import Home from './components/Home';
import Default from './components/Default';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/CreateProject';
import Help from './components/Help';
import LoginPage from './components/Login';

function App() {
    return (
        <Fragment>
            <TopBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectList} />
                <Route path="/project/:projectId" component={ProjectDetails} />
                <Route path="/create-project" component={CreateProject} />
                <Route path="/help" component={Help} />
                <Route path="/login" component={LoginPage} />
                <Route component={Default} />
            </Switch>
        </Fragment>
    );
}

export default App;
