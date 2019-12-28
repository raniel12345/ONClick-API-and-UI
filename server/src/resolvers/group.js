import { combineResolvers } from "graphql-resolvers";
import { UserInputError } from "apollo-server";
import { isAdmin, isAuthenticated } from "./authorization";

export default {
  Query: {
    userGroups: combineResolvers(
      isAuthenticated,
      async (_, __, { dataSources }) => {
        return await dataSources.UserGroupAPI.getAll();
      }
    ),
    userGroupById: combineResolvers(
      isAuthenticated,
      async (_, { id }, { dataSources }) => {
        return await dataSources.UserGroupAPI.getById(id);
      }
    )
  },
  Mutation: {
    createUserGroup: combineResolvers(
      isAdmin,
      async (_, { input: { title, description } }, { dataSources }) => {
        return await dataSources.UserGroupAPI.createNew(title, description);
      }
    ),
    updateUserGroup: combineResolvers(
      isAdmin,
      async (_, { input: { id, title, description } }, { dataSources }) => {
        if (id) {
          return await dataSources.UserGroupAPI.updateGroup(
            id,
            title,
            description
          );
        } else {
          throw new UserInputError("Id is required");
        }
      }
    )
  }
};
