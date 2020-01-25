import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ProjectTile from './ProjectTile';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
});

function Projects(props) {
    const { classes, onDrawerToggle } = props;

    return (
        <List className={classes.root}>
            <ProjectTile />
            <ProjectTile />
            <ProjectTile />
            <ProjectTile />
        </List>
    );
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
