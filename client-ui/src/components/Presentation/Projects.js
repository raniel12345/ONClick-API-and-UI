import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import Header from './Header';
import ProjectAppBar from './ProjectList/ProjectAppBar';
import Projects from './ProjectList/Projects';
import Loading from './ProjectList/Loading';
import ProjectMembers from './ProjectList/ProjectMembers';
import Chip from '@material-ui/core/Chip';

import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_PROJECTS_BY_CURRENT_USER, SEARCH_PROJECTS } from '../Queries/Project/queries';

const styles = theme => ({
    contentWrapper: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: 800
    }
});

function AllProjects(props) {
    const { data, loading, error } = useQuery(GET_ALL_PROJECTS_BY_CURRENT_USER, {
        errorPolicy: 'all'
    });

    if (loading) return <Loading />;

    if (error) {
        return <h2>{error.message}</h2>;
    }

    return (
        <Projects
            projects={data.projects}
            setDisplayAMsg={props.setDisplayAMsg}
            setPageMsgSeverity={props.setPageMsgSeverity}
            setPageMsg={props.setPageMsg}
            viewProjectDetailsHandler={props.viewProjectDetailsHandler}
        />
    );
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

    return (
        <Projects
            projects={data.searchProjects}
            searching
            searchString={props.searchString}
            setDisplayAMsg={props.setDisplayAMsg}
            setPageMsgSeverity={props.setPageMsgSeverity}
            setPageMsg={props.setPageMsg}
            viewProjectDetailsHandler={props.viewProjectDetailsHandler}
        />
    );
}

function ProjectList({ classes, onDrawerToggle }) {
    const [selectedProject, setSelectedProject] = useState({
        id: 0,
        title: '',
        description: '',
        tags: [],
        modules: [],
        status: '',
        subProject: ''
    });

    const [isSearching, setIsSearching] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [displayAMsg, setDisplayAMsg] = useState(false);
    const [pageMsgSeverity, setPageMsgSeverity] = useState('');
    const [pageMsg, setPageMsg] = useState('');

    const viewProjectDetailsHandler = project => {
        setSelectedProject({
            id: project.id,
            title: project.title,
            description: project.description,
            tags: [...project.tags],
            status: project.status.status,
            modules: [...project.modules],
            subProject: project.subProject
        });
        console.log(selectedProject);
    };

    if (displayAMsg) {
        setTimeout(function() {
            setDisplayAMsg(false);
            setPageMsgSeverity('');
            setPageMsg('');
        }, 15000);
    }
    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Your Projects" />
            <main className={classes.main}>
                <Grid container spacing={3}>
                    {displayAMsg ? (
                        <Grid item sm={12}>
                            <Alert severity={pageMsgSeverity}>{pageMsg}</Alert>
                        </Grid>
                    ) : (
                        ''
                    )}
                    <Grid item md={8} sm={12} xs={12}>
                        <Card className={classes.card} variant="outlined">
                            <ProjectAppBar
                                setIsSearching={setIsSearching}
                                setSearchString={setSearchString}
                            />
                            <CardContent>
                                <div className={classes.contentWrapper}>
                                    {isSearching === false ? (
                                        <AllProjects
                                            viewProjectDetailsHandler={viewProjectDetailsHandler}
                                            setDisplayAMsg={setDisplayAMsg}
                                            setPageMsgSeverity={setPageMsgSeverity}
                                            setPageMsg={setPageMsg}
                                        />
                                    ) : (
                                        <SearchProject
                                            viewProjectDetailsHandler={viewProjectDetailsHandler}
                                            searchString={searchString}
                                            setDisplayAMsg={setDisplayAMsg}
                                            setPageMsgSeverity={setPageMsgSeverity}
                                            setPageMsg={setPageMsg}
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <Card className={classes.card} variant="outlined">
                            <CardHeader title={selectedProject.title} />
                            <CardContent>
                                <Divider light />
                                <Typography variant="h6" gutterBottom>
                                    Description:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {selectedProject.description}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Sub Project of:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {selectedProject.subProject}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Status:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {selectedProject.status}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Tags:
                                </Typography>
                                <div>
                                    {selectedProject.tags.map(tag => (
                                        <Chip key={tag} label={tag} variant="outlined" />
                                    ))}
                                </div>
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    Modules:
                                </Typography>
                                <div>
                                    {selectedProject.modules.map(module => (
                                        <Chip key={module} label={module} variant="outlined" />
                                    ))}
                                </div>
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    Project Members:
                                </Typography>

                                <ProjectMembers projectId={selectedProject.id} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </Fragment>
    );
}

ProjectList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectList);
