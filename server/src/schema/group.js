import { gql } from "apollo-server";

export default gql`
  type Group {
    id: ID!
    title: String!
    description: String!
    members: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  extend type Query {
    Groups: [Group!]
    GroupById(id: ID!): Group!
  }

  input GroupInput {
    id: ID
    title: String!
    description: String!
  }

  extend type Mutation {
    createGroup(input: GroupInput): Group!
    updateGroup(input: GroupInput): Group!
    addUserToGroup(userId: ID!, groupId: ID!): Group!
  }
`;
