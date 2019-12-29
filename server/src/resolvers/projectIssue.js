import { combineResolvers } from "graphql-resolvers";
import { isAdmin, isAuthenticated } from "./authorization";

export default {
  Query: {
    projectIssues: combineResolvers(
      isAuthenticated,
      async (_, { projectId }, { dataSources }) => {
        return await dataSources.IssueAPI.getAll(projectId);
      }
    ),
    projectFeature: combineResolvers(
      isAuthenticated,
      async (_, { projectId, issueId }, { dataSources }) => {
        return await dataSources.IssueAPI.getById(projectId, issueId);
      }
    )
  },
  Mutation: {
    addProjectIssue: combineResolvers(
      isAuthenticated,
      async (_, { input }, { dataSources }) => {
        return await dataSources.IssueAPI.createNew(input);
      }
    ),
    updateProjectIssue: combineResolvers(
      isAuthenticated,
      async (_, { input, issueId }, { dataSources }) => {
        return await dataSources.IssueAPI.updateIssue(input, issueId);
      }
    ),
    deleteProjectIssue: combineResolvers(
      isAuthenticated,
      async (_, { issueId }, { dataSources }) => {
        return await dataSources.IssueAPI.deleteIssue(issueId);
      }
    )
  }
};
