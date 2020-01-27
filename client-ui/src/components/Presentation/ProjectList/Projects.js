import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ProjectTile from './ProjectTile';
import Modal from '../Modal';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
});

function Projects(props) {
    const { classes, projects, viewProjectDetailsHandler } = props;

    const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
    const [projectIdToDelete, setProjectIdToDelete] = useState(0);

    const handleClose = () => {
        setDeleteProjectModalOpen(false);
        setProjectIdToDelete(0);
    };

    const deleteProject = projectId => {
        if (projectId && projectId > 0) {
            setProjectIdToDelete(projectId);
            setDeleteProjectModalOpen(true);
        }
    };

    return (
        <Fragment>
            <Modal open={deleteProjectModalOpen} handleClose={handleClose}>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
            </Modal>
            <List className={classes.root}>
                {projects.length > 0
                    ? projects.map(project => {
                          // console.log(project);
                          return (
                              <ProjectTile
                                  key={project.id}
                                  project={project}
                                  viewProjectDetailsHandler={viewProjectDetailsHandler}
                                  deleteProject={deleteProject}
                              />
                          );
                      })
                    : ''}
            </List>
        </Fragment>
    );
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
