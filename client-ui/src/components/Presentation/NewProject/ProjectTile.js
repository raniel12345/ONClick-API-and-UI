import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    inline: {
        display: 'inline'
    },
    actionBtn: {
        margin: '2px'
    }
});

function ProjectTile(props) {
    const { classes } = props;
    //viewProjectDetailsHandler

    const { id, title, description, status } = props.project;

    return (
        <Fragment>
            <ListItem
                alignItems="flex-start"
                button
                // onClick={() => {
                //     viewProjectDetailsHandler(props.project);
                // }}
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={title}
                    secondary={
                        <Typography variant="caption" display="block" gutterBottom>
                            {status.status + ' - ' + description}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider light />
        </Fragment>
    );
}

ProjectTile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectTile);
