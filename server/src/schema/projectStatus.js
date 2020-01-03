import { gql } from 'apollo-server';

export default gql`
    type ProjectStatus {
        id: ID!
        status: String!
        description: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        deletedAt: DateTime
    }

    extend type Query {
        projectStatuses: [ProjectStatus!]!
    }

    type ProjectStatusResponse {
        success: Boolean!
        message: String!
        projectStatus: ProjectStatus!
    }

    extend type Mutation {
        createProjectStatus(status: String!, description: String!): ProjectStatusResponse!
    }
`;
