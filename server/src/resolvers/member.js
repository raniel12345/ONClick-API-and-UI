import { combineResolvers } from "graphql-resolvers";
// import { ForbiddenError } from "apollo-server";
import { isAdmin, isAuthenticated } from "./authorization";

export default {
  Query: {
    projectUsersMembers: combineResolvers(
      isAuthenticated,
      async (_, { projectId }, { me, dataSources }) => {
        return await dataSources.MemberAPI.getUserMembersIdsById(projectId);
      }
    ),
    projectGroupsMembers: combineResolvers(
      isAuthenticated,
      async (_, { projectId }, { me, dataSources }) => {
        return await dataSources.MemberAPI.getGroupMembersIdsById(projectId);
      }
    ),
    projectMembers: combineResolvers(
      isAuthenticated,
      async (_, { projectId }, { me, dataSources }) => {
        return await dataSources.MemberAPI.getAllProjectMembersIds(projectId);
      }
    )
  },
  Mutation: {
    addProjectMember: combineResolvers(
      isAuthenticated,
      async (
        _,
        { input: { projectId, role, memberType, memberId } },
        { me: { id }, dataSources }
      ) => {
        return await dataSources.MemberAPI.addMember(
          projectId,
          role,
          memberType,
          memberId,
          id
        );
      }
    )
  },
  UserMember: {
    user: async (members, args, { loaders }) => {
      return await loaders.user.load(members.userId);
    }
  },
  GroupMember: {
    group: async (members, args, { loaders }) => {
      return await loaders.group.load(members.groupUserId);
    }
  }
};
