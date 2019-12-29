import { DataSource } from "apollo-datasource";
import { AuthenticationError, UserInputError } from "apollo-server";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default class MemberAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getUserMembersIdsById(projectId) {
    return await this.store.PerUserProjectMember.findAll({
      where: {
        projectId: projectId
      }
    }).then(users => {
      return users;
      // return users ? users.map(u => u.userId) : [];
    });
  }

  async getGroupMembersIdsById(projectId) {
    return await this.store.PerGroupProjectMember.findAll({
      where: {
        projectId: projectId
      }
    }).then(groups => {
      return groups;
      // return groups ? groups.map(g => g.groupUserId) : [];
    });
  }

  async getAllProjectMembersIds(projectId) {
    return {
      memberUsers: await this.getUserMembersIdsById(projectId),
      memberGroups: await this.getGroupMembersIdsById(projectId)
    };
  }

  async addMember(projectId, role, memberType, memberId, currentUserId) {
    const project = this.store.Project.findByPk(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    // if (project.userId !== currentUserId) {
    //   throw new Error("Permission denied!");
    // }

    if (memberType === "User") {
      const user = this.store.User.findByPk(memberId);
      if (!user) {
        throw new Error("User not found");
      }

      await this.store.PerUserProjectMember.create({
        role: role,
        userId: memberId,
        projectId: projectId
      });
    } else if (memberType === "Group") {
      const group = this.store.Group.findByPk(memberId);
      if (!group) {
        throw new Error("Group not found");
      }

      await this.store.PerGroupProjectMember.create({
        role: role,
        groupUserId: memberId,
        projectId: projectId
      });
    } else {
      throw new UserInputError("Unknown member type");
    }

    return this.getAllProjectMembersIds(projectId);
  }
}
