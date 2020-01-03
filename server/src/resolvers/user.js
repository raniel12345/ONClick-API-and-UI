import { combineResolvers } from 'graphql-resolvers';
// import { ForbiddenError } from "apollo-server";
import { isAdmin, isAuthenticated } from './authorization';

export default {
    Query: {
        users: combineResolvers(isAuthenticated, async (_, __, { dataSources }) => {
            return await dataSources.UserAPI.getAll();
        }),
        user: combineResolvers(isAuthenticated, async (_, { id }, { dataSources }) => {
            return await dataSources.UserAPI.getById(id);
        }),
        me: combineResolvers(isAuthenticated, async (_, __, { dataSources }) => {
            return await dataSources.UserAPI.getMeInfo();
        })
    },
    Mutation: {
        signUp: async (_, args, { secret, dataSources }) => {
            return await dataSources.UserAPI.createNew(args, secret);
        },
        updateUserPassword: combineResolvers(
            isAuthenticated,
            async (_, args, { secret, me, dataSources }) => {
                if (isNaN(args.id)) {
                    return {
                        success: false,
                        message: 'Invalid id',
                        token: ''
                    };
                }

                if (me && me.role && me.role === 'ADMIN') {
                    return await dataSources.UserAPI.updatePassword(args, secret);
                }

                if (parseInt(args.id) !== me.id) {
                    return {
                        success: false,
                        message:
                            "Permission denied - You are not an admin user. You cannot update other user's password",
                        token: ''
                    };
                }

                args.id = me.id; // use the id of the current user
                return await dataSources.UserAPI.updatePassword(args, secret);
            }
        ),
        updateUserRole: combineResolvers(
            isAuthenticated,
            async (_, args, { secret, me, dataSources }) => {
                if (isNaN(args.id)) {
                    return {
                        success: false,
                        message: 'Invalid id',
                        token: ''
                    };
                }

                if (me && me.role && me.role === 'ADMIN') {
                    return await dataSources.UserAPI.updateRole(args, secret);
                }

                if (parseInt(args.id) !== me.id) {
                    return {
                        success: false,
                        message:
                            "Permission denied - You are not an admin user. You cannot update other user's password",
                        token: ''
                    };
                }

                args.id = me.id; // use the id of the current user
                return await dataSources.UserAPI.updateRole(args, secret);
            }
        ),
        signIn: async (_, args, { secret, dataSources }) => {
            return await dataSources.UserAPI.signIn(args, secret);
        },
        deleteUser: combineResolvers(isAdmin, async (_, { id }, { dataSources }) => {
            return await dataSources.UserAPI.deleteById(id);
        }),
        addUserToGroup: combineResolvers(
            isAuthenticated,
            async (_, { userId, groupId }, { dataSources }) => {
                return await dataSources.UserAPI.addToGroup(userId, groupId);
            }
        )
    },
    User: {
        projects: async (user, args, { dataSources }) => {
            return await dataSources.ProjectAPI.getAllByUserId(user.id);
        },
        projectStatuses: async (user, args, { dataSources }) => {
            return await dataSources.ProjectStatusAPI.getAll(user.id);
        },
        groups: async (user, args, { loaders, dataSources }) => {
            const groupsIds = await dataSources.GroupAPI.getAllGroupsIdById(user.id);

            let results = [];

            results = await loaders.group.loadMany(groupsIds);
            // for (const groupId of groupsIds) {
            //   const res = await loaders.group.load(groupId);
            //   if (res) results.push(res);
            // }

            return results;
        }
    }
};
