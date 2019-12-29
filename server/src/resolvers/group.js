import { combineResolvers } from "graphql-resolvers";
import { UserInputError } from "apollo-server";
import { isAdmin, isAuthenticated } from "./authorization";

export default {
  Query: {
    Groups: combineResolvers(
      isAuthenticated,
      async (_, __, { dataSources }) => {
        return await dataSources.GroupAPI.getAll();
      }
    ),
    GroupById: combineResolvers(
      isAuthenticated,
      async (_, { id }, { dataSources }) => {
        return await dataSources.GroupAPI.getById(id);
      }
    )
  },
  Mutation: {
    createGroup: combineResolvers(
      isAdmin,
      async (_, { input: { title, description } }, { dataSources }) => {
        return await dataSources.GroupAPI.createNew(title, description);
      }
    ),
    updateGroup: combineResolvers(
      isAdmin,
      async (_, { input: { id, title, description } }, { dataSources }) => {
        if (id) {
          return await dataSources.GroupAPI.updateGroup(id, title, description);
        } else {
          throw new UserInputError("Id is required");
        }
      }
    )
  },
  Group: {
    members: async (group, args, { loaders, dataSources }) => {
      const membersIds = await dataSources.GroupAPI.getAllMembersIdById(
        group.id
      );

      let results = [];

      results = await loaders.user.loadMany(membersIds);
      // for (const userId of membersIds) {
      //   const res = await loaders.user.load(userId);
      //   if (res) results.push(res);
      // }

      return results;
    }
  }
};
