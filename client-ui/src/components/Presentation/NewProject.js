import React, { Fragment } from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

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

    const [state, setState] = React.useState({
        isPublic: true
    });

    const isPublicHandleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const tagsDeleteHandle = () => {
        console.info('You clicked the delete icon.');
    };

    const tagsClickHandle = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Create new project" />

            <main className={classes.main}>
                <Grid container spacing={3}>
                    <Grid item md={9} sm={12} xs={12}>
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
                                                <TextField
                                                    id="project-title"
                                                    fullWidth
                                                    margin="normal"
                                                    label="Title"
                                                />
                                                <TextField
                                                    id="sub-project-of"
                                                    fullWidth
                                                    margin="normal"
                                                    label="Sub Project of"
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
                                                />
                                                <div className={classes.tags}>
                                                    <Chip
                                                        label="Deletable primary"
                                                        onDelete={tagsDeleteHandle}
                                                        color="primary"
                                                    />
                                                    <Chip
                                                        label="Deletable primary"
                                                        onDelete={tagsDeleteHandle}
                                                        color="primary"
                                                    />
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
