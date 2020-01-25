import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Loading from './Loading';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
}));

const GET_PROJECT_MEMBERS = gql`
    query projectMembers($projectId: ID!) {
        projectMembers(projectId: $projectId) {
            memberUsers {
                role
                user {
                    username
                    email
                    role
                }
            }
            memberGroups {
                group {
                    title
                }
                role
            }
        }
    }
`;

export default function CheckboxListSecondary(props) {
    const classes = useStyles();

    const { projectId } = props;

    const { data, loading, error } = useQuery(GET_PROJECT_MEMBERS, {
        variables: {
            projectId: projectId
        }
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <List dense className={classes.root}>
            {data && data.projectMembers && data.projectMembers.memberUsers
                ? data.projectMembers.memberUsers.map(user => {
                      return (
                          <ListItem key={user.user.email} button>
                              <ListItemAvatar>
                                  <Avatar alt={user.user.username} src="" />
                              </ListItemAvatar>
                              <ListItemText
                                  id={user.user.email}
                                  primary={user.user.username}
                                  secondary={user.user.email + ' - ' + user.role}
                              />
                          </ListItem>
                      );
                  })
                : ''}
            {data && data.projectMembers && data.projectMembers.memberGroups
                ? data.projectMembers.memberGroups.map(group => {
                      return (
                          <ListItem key={group} button>
                              <ListItemAvatar>
                                  <Avatar alt={group.group.title} src="" />
                              </ListItemAvatar>
                              <ListItemText
                                  id={group.group.title}
                                  primary={group.group.title}
                                  secondary={group.role}
                              />
                          </ListItem>
                      );
                  })
                : ''}
        </List>
    );
}
