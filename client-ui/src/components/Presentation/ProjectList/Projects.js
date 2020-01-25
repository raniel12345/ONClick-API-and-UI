import React from 'react';
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
    const { classes, projects, viewProjectDetailsHandler } = props;

    return (
        <List className={classes.root}>
            {projects.length > 0
                ? projects.map(project => {
                      // console.log(project);
                      return (
                          <ProjectTile
                              key={project.id}
                              project={project}
                              viewProjectDetailsHandler={viewProjectDetailsHandler}
                          />
                      );
                  })
                : ''}
        </List>
    );
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
