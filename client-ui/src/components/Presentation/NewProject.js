import React, { Fragment, useState } from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import FindInPageIcon from '@material-ui/icons/FindInPage';

import SelectSubProject from './NewProject/SelectSubProject';
import ProjectMemberSelect from './ProjectMemberSelect';
import ModuleSelect from './ModuleSelect';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    card: {
        minWidth: 275
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: '#eaeff1'
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.2)
        }
    },
    actions: {
        display: 'flex'
    },
    expand: {
        marginLeft: 'auto'
    }
}));

export default function NewProject({ onDrawerToggle }) {
    const classes = useStyles();

    const [state, setState] = useState({
        isPublic: true,
        subProject: {
            id: 0,
            title: ''
        },
        title: '',
        description: '',
        homePage: '',
        tags: []
    });

    // const [inputValidation, setInputValidation] = useState({
    //     tags: {
    //         error: false,
    //         msg: ''
    //     }
    // });

    const [isSelectSubProjectDialogOpen, setIsSelectSubProjectDialogOpen] = useState(false);

    const setSubProject = (id, title) => {
        setState({
            ...state,
            subProject: {
                id,
                title
            }
        });
    };

    const isPublicHandleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const handleInputting = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const camelize = text => {
        text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
        return text.substr(0, 1).toLowerCase() + text.substr(1);
    };

    const handleTagsInputting = name => event => {
        if (event.key === 'Enter') {
            let tempTags = [...state.tags];
            tempTags.push(camelize(event.target.value));
            setState({ ...state, [name]: tempTags });
            event.target.value = '';
        }
    };

    const tagsDeleteHandle = tag => {
        let tempTags = [...state.tags];
        const index = tempTags.indexOf(tag);
        tempTags.splice(index, 1);
        setState({ ...state, tags: tempTags });
    };

    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Create new project" />

            <main className={classes.main}>
                <Grid container spacing={3}>
                    <Grid item md={9} sm={12} xs={12}>
                        <SelectSubProject
                            open={isSelectSubProjectDialogOpen}
                            setSelectSubProjectDialog={setIsSelectSubProjectDialogOpen}
                        />
                        <Card className={classes.card} variant="outlined">
                            <CardHeader title="Project Details" subheader="September 14, 2016" />
                            <CardContent>
                                <div className={classes.root}>
                                    <div>
                                        <form
                                            className={classes.root}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={state.isPublic}
                                                            onChange={isPublicHandleChange(
                                                                'isPublic'
                                                            )}
                                                            value="isPublic"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Public"
                                                />

                                                <FormControl fullWidth disabled>
                                                    <InputLabel htmlFor="standard-adornment-password">
                                                        Sub Project of
                                                    </InputLabel>
                                                    <Input
                                                        id="standard-adornment-password"
                                                        value="testing"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle findInPage"
                                                                    onClick={() => {
                                                                        setIsSelectSubProjectDialogOpen(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <FindInPageIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>

                                                <TextField
                                                    id="project-title"
                                                    fullWidth
                                                    margin="normal"
                                                    label="Title"
                                                />
                                                <TextField
                                                    id="standard-textarea"
                                                    label="Description"
                                                    multiline
                                                    fullWidth
                                                    margin="normal"
                                                />
                                                <TextField
                                                    id="sub-project-of"
                                                    fullWidth
                                                    margin="normal"
                                                    label="Home page"
                                                />
                                                <TextField
                                                    id="standard-search"
                                                    label="Tags"
                                                    type="search"
                                                    fullWidth
                                                    margin="normal"
                                                    onKeyDown={handleTagsInputting('tags')}
                                                />
                                                <div className={classes.tags}>
                                                    {state.tags
                                                        ? state.tags.map(tag => {
                                                              return (
                                                                  <Chip
                                                                      key={tag}
                                                                      label={tag}
                                                                      onDelete={() => {
                                                                          tagsDeleteHandle(tag);
                                                                      }}
                                                                      color="primary"
                                                                  />
                                                              );
                                                          })
                                                        : ''}
                                                </div>
                                            </FormGroup>
                                        </form>
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className={classes.actions}>
                                <Button size="small" className={classes.expand}>
                                    Learn More
                                </Button>
                                <Button variant="contained" size="large" color="primary">
                                    Create project
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <Card className={classes.card} variant="outlined">
                            <CardHeader title="Choose Project members" />
                            <CardContent>
                                <ProjectMemberSelect />
                            </CardContent>
                        </Card>

                        <Card className={classes.card} variant="outlined">
                            <CardHeader title="Choose modules" />
                            <CardContent>
                                <ModuleSelect />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </Fragment>
    );
}
