import { gql } from "apollo-server";

export default gql`
  enum IssueType {
    Bug
    Error
  }

  enum IssueStatus {
    New
    Open
    Closed
  }

  type ProjectIssue {
    id: ID!
    title: String!
    description: String!
    priority: Int!
    issueType: IssueType!
    status: IssueStatus!
    percentCompletion: Int!
    estimatedTime: Int!
    spentTime: Int!
    startDate: Date!
    dueDate: Date!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  extend type Query {
    projectIssues(projectId: ID!): [ProjectIssue!]
    projectIssue(projectId: ID!, issueId: ID!): ProjectIssue!
  }

  input ProjectIssueInput {
    projectId: ID!
    title: String!
    description: String!
    priority: Int!
    issueType: IssueType!
    status: IssueStatus!
    percentCompletion: Int!
    estimatedTime: Int!
    spentTime: Int!
    startDate: Date!
    dueDate: Date!
  }

  extend type Mutation {
    updateProjectIssue(issueId: ID, input: ProjectFeatureInput): ProjectIssue!
    deleteProjectIssue(issueId: ID): ProjectIssue!
    createProjectIssue(input: ProjectIssueInput!): ProjectIssue!
  }
`;
