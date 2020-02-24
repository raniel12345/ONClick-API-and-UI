import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Projects from './Presentation/Projects';
import Project from './Presentation/ProjectDetails';
import NewProject from './Presentation/NewProject';
import Users from './Presentation/Users';

import { CreateProductProvider } from './Presentation/Contexts/CreateProductContext';

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
                <CreateProductProvider>
                    <NewProject onDrawerToggle={onDrawerToggle} />
                </CreateProductProvider>
            </Route>
            <Route path="/users">
                <Users onDrawerToggle={onDrawerToggle} />
            </Route>
        </Switch>
    );
}
