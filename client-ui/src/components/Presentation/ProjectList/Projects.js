import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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

const DELETE_PROJECT = gql`
    mutation deleteProject($projectId: ID!, $ownerId: ID!) {
        deleteProject(id: $projectId, userId: $ownerId) {
            success
            message
            project {
                title
                description
            }
        }
    }
`;

function Projects(props) {
    const { classes, projects, viewProjectDetailsHandler } = props;

    const [deleteProjectDialogOpen, SetDeleteProjectDialogOpen] = useState(false);
    const [projectOwnerIdToDelete, setProjectOwnerIdToDelete] = useState(0);
    const [projectIdToDelete, setProjectIdToDelete] = useState(0);
    const [projectTitleToDelete, setProjectTitleToDelete] = useState('');

    const [deleteProject, { loading, error }] = useMutation(DELETE_PROJECT, {
        onCompleted({ deleteProject }) {
            console.log(deleteProject);
        },
        onError(err) {
            console.log(err);
        }
    });

    const handleCancel = () => {
        SetDeleteProjectDialogOpen(false);
        setProjectIdToDelete(0);
        setProjectTitleToDelete('');
    };

    const handleProjectDeletion = () => {
        deleteProject({
            variables: {
                projectId: projectIdToDelete,
                ownerId: projectOwnerIdToDelete
            }
        });
    };

    const deleteThisProject = (ownerId, projectId, projectTitle) => {
        if (ownerId && ownerId > 0 && projectId && projectId > 0 && projectTitle) {
            setProjectOwnerIdToDelete(ownerId);
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
                    <Button onClick={handleProjectDeletion} color="secondary">
                        {loading ? 'Loading...' : 'Confirm'}
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
                                  deleteThisProject={deleteThisProject}
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
