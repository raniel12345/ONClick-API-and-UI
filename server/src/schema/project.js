import { gql } from "apollo-server";

export default gql`
  enum Module {
    ISSUE_TRACKING
    WIKI
    TIME_TRACKING
    FORUMS
    NEWS
    CALENDAR
    DOCUMENTS
    GANTT
    FILES
  }

  type Project {
    id: ID!
    title: String!
    subProject: String!
    description: String!
    homePage: String!
    tags: [String!]!
    isPublic: Boolean!
    owner: User!
    modules: [Module!]!
    status: ProjectStatus!
    members: ProjectMembers
    issues: [ProjectIssue!]
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime!
  }

  input ProjectInput {
    """
    ID from ProjectStatus Table
    """
    initialStatus: ID!
    title: String!
    subProject: String
    description: String!
    homePage: String!
    tags: [String!]!
    isPublic: Boolean!
    modules: [Module!]!
  }

  input ProjectUpdateInput {
    id: ID
    title: String!
    subProject: String
    description: String!
    homePage: String!
    isPublic: Boolean!
  }

  extend type Query {
    projects: [Project!]
    project(id: ID!): Project!
  }

  type ProjectResponse {
    success: Boolean!
    message: String!
    project: Project!
  }

  extend type Mutation {
    createProject(input: ProjectInput!): Project!
    updateProject(input: ProjectUpdateInput!): Project!
    addProjectModule(module: Module!, projectId: ID!): [Module!]!
    deleteProjectModule(module: Module!, projectId: ID): [Module!]
    addProjectTag(tag: String!, projectId: ID!): [String!]!
    deleteProjectTag(tag: String!, projectId: ID): [String!]
    deleteProject(id: ID!, userId: ID): ProjectResponse
  }
`;
