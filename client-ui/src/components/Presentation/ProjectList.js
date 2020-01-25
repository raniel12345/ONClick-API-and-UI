import React, { Fragment } from 'react';
import Header from './Header';

export default function ProjectList({ classes, onDrawerToggle }) {
    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Your Projects" />
            <main className={classes.main}>
                <h1>Projects</h1>
            </main>
        </Fragment>
    );
}
