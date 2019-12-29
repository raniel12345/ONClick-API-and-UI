import { gql } from "apollo-server";

export default gql`
  enum FeatureStatus {
    New
    Open
    Closed
  }

  type ProjectFeature {
    id: ID!
    title: String!
    description: String!
    priority: Int!
    status: FeatureStatus!
    percentCompletion: Int!
    startDate: Date!
    dueDate: Date!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  extend type Query {
    projectFeatures(projectID: ID!): [ProjectFeature!]
    projectFeature(projectId: ID, featureId: ID): ProjectFeature!
  }

  input ProjectFeatureInput {
    projectId: ID!
    title: String!
    description: String!
    priority: Int!
    status: FeatureStatus!
    percentCompletion: Int!
    startDate: Date!
    dueDate: Date!
  }

  extend type Mutation {
    updateProjectFeature(
      featureId: ID
      input: ProjectFeatureInput
    ): ProjectFeature!
    deleteProjectFeature(featureId: ID): Boolean!
    createProjectFeature(input: ProjectFeatureInput!): ProjectFeature!
  }
`;
