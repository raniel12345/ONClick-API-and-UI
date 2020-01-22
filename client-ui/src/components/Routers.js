import React from 'react';
import Users from './Users';
import { Switch, Route } from 'react-router-dom';

import Projects from './ProjectList';
import Project from './Project/index';
import NewProject from './NewProject';

export default function Routers({ classes, onDrawerToggle }) {
    return (
        <Switch>
            <Route exact path="/">
                <Projects classes={classes} onDrawerToggle={onDrawerToggle} />
            </Route>
            <Route exact path="/project">
                <Project classes={classes} onDrawerToggle={onDrawerToggle} />
            </Route>
            <Route exact path="/new-project">
                <NewProject onDrawerToggle={onDrawerToggle} />
            </Route>
            <Route path="/users">
                <Users onDrawerToggle={onDrawerToggle} />
            </Route>
        </Switch>
    );
}
