import { gql } from "apollo-server";

export default gql`
  type UserGroup {
    id: ID!
    title: String!
    description: String!
    members: [User!]
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date
  }

  extend type Query {
    userGroups: [UserGroup!]
    userGroupById(id: ID!): UserGroup!
  }

  input UserGroupInput {
    id: ID
    title: String!
    description: String!
  }

  extend type Mutation {
    createUserGroup(input: UserGroupInput): UserGroup!
    updateUserGroup(input: UserGroupInput): UserGroup!
  }
`;
