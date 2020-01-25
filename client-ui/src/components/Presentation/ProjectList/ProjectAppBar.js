import React, { useState } from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const styles = theme => ({
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    searchInput: {
        fontSize: theme.typography.fontSize
    },
    block: {
        display: 'block'
    },
    newProject: {
        marginRight: theme.spacing(1)
    }
});

function ProjectAppBar(props) {
    const { classes } = props;

    const searchProjectHandler = name => event => {
        if (event.key === 'Enter') {
            if (event.target.value !== '') {
                props.setIsSearching(true);
                props.setSearchString(event.target.value);
            } else {
                props.setIsSearching(false);
                props.setSearchString('');
            }
        }
    };

    return (
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon className={classes.block} color="inherit" />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="Search by title, description, or tags"
                            InputProps={{
                                disableUnderline: true,
                                className: classes.searchInput
                            }}
                            onKeyDown={searchProjectHandler('searchStr')}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" className={classes.newProject}>
                            New Project
                        </Button>
                        <Tooltip title="Reload">
                            <IconButton
                                onClick={() => {
                                    props.setIsSearching(false);
                                }}
                            >
                                <RefreshIcon className={classes.block} color="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

ProjectAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectAppBar);
