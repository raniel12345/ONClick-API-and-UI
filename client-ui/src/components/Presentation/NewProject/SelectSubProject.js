import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import CachedIcon from '@material-ui/icons/Cached';

import Loading from '../ProjectList/Loading';

import {
    GET_ALL_PROJECTS_BY_CURRENT_USER,
    SEARCH_PROJECTS,
    DELETE_PROJECT
} from '../../Queries/Project/queries';

import Projects from './Projects';

const useStyles = makeStyles(theme => ({
    searchProjectField: {
        padding: '2px 4px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        width: 800
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    },
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AllProjects(props) {
    const { data, loading, error } = useQuery(GET_ALL_PROJECTS_BY_CURRENT_USER, {
        errorPolicy: 'all'
    });
    if (loading) return <Loading />;

    if (error) {
        return <h2>{error.message}</h2>;
    }

    return <Projects projects={data.projects} />;
}

function SearchProject(props) {
    const { data, loading, error } = useQuery(SEARCH_PROJECTS, {
        errorPolicy: 'all',
        variables: {
            searchStr: props.searchString
        }
    });

    if (loading) return <Loading />;
    if (error) {
        return <h2>{error.message}</h2>;
    }

    return <Projects projects={data.searchProjects} />;
}

export default function SearchSubProjectDialog(props) {
    const classes = useStyles();
    const [isSearching, setIsSearching] = useState(false);
    const [searchString, setSearchString] = useState('');

    const { open } = props;

    const handleClose = () => {
        console.log('closed');
    };

    const searchProjectHandler = name => event => {
        if (event.key === 'Enter') {
            if (event.target.value !== '') {
                setIsSearching(true);
                setSearchString(event.target.value);
            } else {
                setIsSearching(false);
                setSearchString('');
            }
        }
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                props.setSelectSubProjectDialog(false);
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Sub Project of
                        </Typography>
                        <Paper className={classes.searchProjectField} elevation={0}>
                            <InputBase
                                className={classes.input}
                                placeholder="Enter Search Project"
                                inputProps={{ 'aria-label': 'search project' }}
                                onKeyDown={searchProjectHandler('searchStr')}
                            />
                            <Divider className={classes.divider} light orientation="vertical" />
                            <IconButton
                                color="primary"
                                className={classes.iconButton}
                                aria-label="directions"
                                onClick={() => {
                                    setIsSearching(false);
                                    setSearchString('');
                                }}
                            >
                                <CachedIcon />
                            </IconButton>
                        </Paper>
                    </Toolbar>
                </AppBar>
                {isSearching === false ? (
                    <AllProjects />
                ) : (
                    <SearchProject searchString={searchString} />
                )}
            </Dialog>
        </div>
    );
}
