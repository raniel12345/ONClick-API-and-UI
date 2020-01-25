import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Header from './Header';
import ProjectAppBar from './ProjectList/ProjectAppBar';
import Projects from './ProjectList/Projects';
import Loading from './ProjectList/Loading';
import ProjectMembers from './ProjectList/ProjectMembers';

const styles = theme => ({
    contentWrapper: {
        // margin: '10px 16px',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 800
    }
});

function ProjectList({ classes, onDrawerToggle }) {
    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Your Projects" />
            <main className={classes.main}>
                <Grid container spacing={3}>
                    <Grid item md={8} sm={12} xs={12}>
                        <Card className={classes.card} variant="outlined">
                            <ProjectAppBar />
                            <CardContent>
                                <div className={classes.contentWrapper}>
                                    <Projects />
                                    {/* <Loading /> */}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <Card className={classes.card} variant="outlined">
                            <CardHeader title="Project Title" />
                            <CardContent>
                                <Divider light />
                                <Typography variant="h6" gutterBottom>
                                    Description:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Description. Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                                    inventore consectetur, neque doloribus, cupiditate numquam
                                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Sub Project of:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Sub project title
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Status:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Project status
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Tags:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Tags, tags, tags
                                </Typography>
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    Project Members:
                                </Typography>
                                <ProjectMembers />
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
