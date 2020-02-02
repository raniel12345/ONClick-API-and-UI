import React from 'react';
import gql from 'graphql-tag';

export const PROJECT_TILE_DATA = gql`
    fragment ProjectTile on Project {
        id
        title
        subProject
        description
        homePage
        tags
        isPublic
        owner {
            id
            username
        }
        modules
        status {
            status
        }
        members {
            memberUsers {
                user {
                    username
                }
            }
            memberGroups {
                group {
                    title
                }
            }
        }
        issues {
            title
        }
        createdAt
        updatedAt
    }
`;

export const GET_ALL_PROJECTS_BY_CURRENT_USER = gql`
    query {
        projects {
            ...ProjectTile
        }
    }
    ${PROJECT_TILE_DATA}
`;

export const SEARCH_PROJECTS = gql`
    query searchProjects($searchStr: String!) {
        searchProjects(searchStr: $searchStr) {
            ...ProjectTile
        }
    }
    ${PROJECT_TILE_DATA}
`;

export const DELETE_PROJECT = gql`
    mutation deleteProject($projectId: ID!, $ownerId: ID!) {
        deleteProject(id: $projectId, userId: $ownerId) {
            success
            message
            project {
                title
                description
            }
        }
    }
`;
