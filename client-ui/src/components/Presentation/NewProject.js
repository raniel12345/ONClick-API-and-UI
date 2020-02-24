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

import { CreateProductConsumer } from './Contexts/CreateProductContext';

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

    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Create new project" />

            <main className={classes.main}>
                <CreateProductConsumer>
                    {value => {
                        const {
                            isPublic,
                            subProject,
                            tags,
                            addTag,
                            deleteTag,
                            setFormInputVal,
                            openProjectsModal
                        } = value;

                        return (
                            <Grid container spacing={3}>
                                <Grid item md={9} sm={12} xs={12}>
                                    <SelectSubProject />
                                    <Card className={classes.card} variant="outlined">
                                        <CardHeader
                                            title="Project Details"
                                            subheader="September 14, 2016"
                                        />
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
                                                                        checked={isPublic}
                                                                        onChange={event => {
                                                                            setFormInputVal(
                                                                                'isPublic',
                                                                                event.target.checked
                                                                            );
                                                                        }}
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
                                                                    value={subProject.title}
                                                                    endAdornment={
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle findInPage"
                                                                                onClick={() => {
                                                                                    openProjectsModal();
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
                                                                onChange={event => {
                                                                    setFormInputVal(
                                                                        'title',
                                                                        event.target.value
                                                                    );
                                                                }}
                                                            />
                                                            <TextField
                                                                id="standard-textarea"
                                                                label="Description"
                                                                multiline
                                                                fullWidth
                                                                margin="normal"
                                                                onChange={event => {
                                                                    setFormInputVal(
                                                                        'description',
                                                                        event.target.value
                                                                    );
                                                                }}
                                                            />
                                                            <TextField
                                                                id="sub-project-of"
                                                                fullWidth
                                                                margin="normal"
                                                                label="Home page"
                                                                onChange={event => {
                                                                    setFormInputVal(
                                                                        'homePage',
                                                                        event.target.value
                                                                    );
                                                                }}
                                                            />
                                                            <TextField
                                                                id="standard-search"
                                                                label="Tags"
                                                                type="search"
                                                                fullWidth
                                                                margin="normal"
                                                                onKeyDown={event => {
                                                                    if (event.key === 'Enter') {
                                                                        addTag(event.target.value);
                                                                        event.target.value = '';
                                                                    }
                                                                }}
                                                            />
                                                            <div className={classes.tags}>
                                                                {tags
                                                                    ? tags.map(tag => {
                                                                          return (
                                                                              <Chip
                                                                                  key={tag}
                                                                                  label={tag}
                                                                                  onDelete={() => {
                                                                                      deleteTag(
                                                                                          tag
                                                                                      );
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
                                            <Button
                                                variant="contained"
                                                size="large"
                                                color="primary"
                                            >
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
                        );
                    }}
                </CreateProductConsumer>
            </main>
        </Fragment>
    );
}
