import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
// import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import {
    GET_ALL_PROJECTS_BY_CURRENT_USER,
    SEARCH_PROJECTS,
    DELETE_PROJECT
} from '../../Queries/Project/queries';

import ProjectTile from './ProjectTile';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
});

function Projects(props) {
    const { classes, projects, viewProjectDetailsHandler } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [deleteProjectDialogOpen, SetDeleteProjectDialogOpen] = useState(false);
    const [projectOwnerIdToDelete, setProjectOwnerIdToDelete] = useState(0);
    const [projectIdToDelete, setProjectIdToDelete] = useState(0);
    const [projectTitleToDelete, setProjectTitleToDelete] = useState('');

    const [deleteProject, { loading, error }] = useMutation(DELETE_PROJECT, {
        onCompleted({ deleteProject }) {
            console.log(deleteProject);
            if (deleteProject.success) {
                SetDeleteProjectDialogOpen(false);
                setProjectIdToDelete(0);
                setProjectTitleToDelete('');
            }
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
            },
            refetchQueries: [
                {
                    query: !props.searching ? GET_ALL_PROJECTS_BY_CURRENT_USER : SEARCH_PROJECTS,
                    variables: !props.searching
                        ? {}
                        : {
                              searchStr: props.searchString
                          }
                }
            ]
            //props.searching ? {} : {}
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
                fullScreen={fullScreen}
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
