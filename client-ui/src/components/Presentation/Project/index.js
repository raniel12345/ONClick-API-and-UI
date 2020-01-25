import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Header from '../Header';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Overview from './Overview';
import Activity from './Activity';
import Issues from './Issues';
import NewIssue from './NewIssue';
import Gantt from './Gantt';
import Calendar from './Calendar';
import News from './News';
import Documents from './Documents';
import Wiki from './Wiki';
import Files from './Files';
import Settings from './Settings';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function Project({ classes, onDrawerToggle }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <Header onDrawerToggle={onDrawerToggle} text="Project title here">
                <Tabs value={value} onChange={handleChange} textColor="inherit">
                    <Tab textColor="inherit" {...a11yProps(0)} label="Overview" />
                    <Tab textColor="inherit" {...a11yProps(1)} label="Activity" />
                    <Tab textColor="inherit" {...a11yProps(2)} label="Issues" />
                    <Tab textColor="inherit" {...a11yProps(3)} label="New Issue" />
                    <Tab textColor="inherit" {...a11yProps(4)} label="Gantt" />
                    <Tab textColor="inherit" {...a11yProps(5)} label="Calendar" />
                    <Tab textColor="inherit" {...a11yProps(6)} label="News" />
                    <Tab textColor="inherit" {...a11yProps(7)} label="Documents" />
                    <Tab textColor="inherit" {...a11yProps(8)} label="Wiki" />
                    <Tab textColor="inherit" {...a11yProps(9)} label="Files" />
                    <Tab textColor="inherit" {...a11yProps(10)} label="Settings" />
                </Tabs>
            </Header>
            <main className={classes.main}>
                <TabPanel value={value} index={0}>
                    <Overview />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Activity />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Issues />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <NewIssue />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Gantt />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Calendar />
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <News />
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <Documents />
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <Wiki />
                </TabPanel>
                <TabPanel value={value} index={9}>
                    <Files />
                </TabPanel>
                <TabPanel value={value} index={10}>
                    <Settings />
                </TabPanel>
            </main>
        </Fragment>
    );
}
