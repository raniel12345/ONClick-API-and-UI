import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

    const [deleteProjectDialogOpen, SetDeleteProjectDialogOpen] = useState(false);
    const [projectIdToDelete, setProjectIdToDelete] = useState(0);
    const [projectTitleToDelete, setProjectTitleToDelete] = useState('');

    const handleCancel = () => {
        SetDeleteProjectDialogOpen(false);
        setProjectIdToDelete(0);
        setProjectTitleToDelete('');
    };

    const handleDelete = () => {
        console.log('Deleted');
    };

    const deleteProject = (projectId, projectTitle) => {
        if (projectId && projectId > 0 && projectTitle) {
            setProjectIdToDelete(projectId);
            SetDeleteProjectDialogOpen(true);
            setProjectTitleToDelete(projectTitle);
        }
    };

    return (
        <Fragment>
            <Dialog
                open={deleteProjectDialogOpen}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Are you absolutely sure?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone. This will permanently delete the
                        <strong> {projectTitleToDelete}</strong> project, wiki, issues, and
                        comments, and remove all collaborator associations. Please click confirm to
                        continue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
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
