import { gql } from "apollo-server";

export default gql`
  enum UserRole {
    ADMIN
    NORMAL
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRole!
    groups: [Group!]
    projects: [Project!]
    projectStatuses: [ProjectStatus!]
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type UserResponse {
    success: Boolean!
    message: String!
    token: String!
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      role: UserRole!
    ): UserResponse!

    updateUserPassword(
      id: ID!
      currentPwd: String!
      newPwd: String!
    ): UserResponse!

    updateUserRole(id: ID!, role: UserRole): UserResponse!

    signIn(login: String!, password: String!): UserResponse!
    deleteUser(id: ID!): Boolean!
  }
`;
