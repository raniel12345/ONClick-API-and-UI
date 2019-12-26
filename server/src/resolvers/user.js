import { combineResolvers } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
import { isAdmin } from "./authorization";

export default {
  Query: {
    users: async (_, __, { dataSources }) => {
      return await dataSources.UserAPI.getAll();
    },
    user: async (_, { id }, { dataSources }) => {
      return await dataSources.UserAPI.getById(id);
    },
    me: async (_, __, { me, dataSources }) => {
      if (!me) {
        return null;
      }
      return await dataSources.UserAPI.getById(me.id);
    }
  },
  Mutation: {
    signUp: async (_, args, { secret, dataSources }) => {
      return await dataSources.UserAPI.createNew(args, secret);
    },
    updateUserPassword: async (_, args, { secret, me, dataSources }) => {
      if (!me) {
        return {
          success: false,
          message: "Token is expired",
          token: ""
        };
      }

      if (isNaN(args.id)) {
        return {
          success: false,
          message: "Invalid id",
          token: ""
        };
      }

      if (me && me.role && me.role === "ADMIN") {
        return await dataSources.UserAPI.updatePassword(args, secret);
      }

      if (parseInt(args.id) !== me.id) {
        return {
          success: false,
          message:
            "Permission denied - You are not an admin user. You cannot update other user's password",
          token: ""
        };
      }

      args.id = me.id; // use the id of the current user
      return await dataSources.UserAPI.updatePassword(args, secret);
    },
    updateUserRole: async (_, args, { secret, me, dataSources }) => {
      if (!me) {
        return {
          success: false,
          message: "Token is expired",
          token: ""
        };
      }

      if (isNaN(args.id)) {
        return {
          success: false,
          message: "Invalid id",
          token: ""
        };
      }

      if (me && me.role && me.role === "ADMIN") {
        return await dataSources.UserAPI.updateRole(args, secret);
      }

      if (parseInt(args.id) !== me.id) {
        return {
          success: false,
          message:
            "Permission denied - You are not an admin user. You cannot update other user's password",
          token: ""
        };
      }

      args.id = me.id; // use the id of the current user
      return await dataSources.UserAPI.updateRole(args, secret);
    },
    signIn: async (_, args, { secret, dataSources }) => {
      return await dataSources.UserAPI.signIn(args, secret);
    },
    deleteUser: combineResolvers(
      isAdmin,
      async (_, { id }, { dataSources }) => {
        return await dataSources.UserAPI.deleteById(id);
      }
    )
  },
  User: {
    projects: async (user, args, { dataSources }) => {
      return await dataSources.ProjectAPI.getAllByUserId(user.id);
    },
    projectStatuses: async (user, args, { dataSources }) => {
      return await dataSources.ProjectStatusAPI.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};