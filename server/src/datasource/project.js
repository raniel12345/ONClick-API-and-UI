import { DataSource } from "apollo-datasource";
import { AuthenticationError, UserInputError } from "apollo-server";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default class ProjectAPI extends DataSource {
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

  /**
   * Get all projects
   */
  async getAll() {
    return await this.store.Project.findAll();
  }

  async getById(projectID, userId) {
    return await this.store.Project.findAll({
      where: {
        id: projectID,
        userId: userId
      }
    });

    //,
    //include: [this.store.User]
  }

  async getAllByUserId(userId) {
    return await this.store.Project.findAll({
      where: {
        userId: userId
      }
    });
  }

  async createNew(projectInput, userId) {
    const {
      initialStatus,
      title,
      subProject,
      description,
      tags,
      homePage,
      isPublic,
      modules
    } = projectInput;

    return await this.store.User.findByPk(userId)
      .then(async user => {
        return await user.createProject(
          {
            ticketNo: "temp",
            title,
            subProject,
            description,
            tags,
            homePage,
            isPublic,
            modules,
            projectStatusId: parseInt(initialStatus)
          },
          {
            include: [this.store.ProjectStatus]
          }
        );
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  updateProject(projectInput, userId) {
    let {
      id,
      title,
      subProject,
      description,
      homePage,
      isPublic
    } = projectInput;

    if (isNaN(id)) {
      throw new Error("Id is required or invalid");
    }

    id = parseInt(id);

    return this.store.Project.findByPk(id)
      .then(async project => {
        if (!project) {
          throw new Error("Project not found");
        }

        if (userId !== project.userId) {
          throw new Error("Permission denied!");
        }

        return project.update({
          title,
          subProject,
          description,
          homePage,
          isPublic
        });
      })
      .catch(err => {
        throw err;
      });
  }

  addModule(module, projectId, userId) {
    if (isNaN(projectId)) {
      throw new Error("Project Id is required or invalid");
    }

    projectId = parseInt(projectId);

    return this.store.Project.findByPk(projectId)
      .then(async project => {
        if (!project) {
          throw new Error("Project not found");
        }

        if (userId !== project.userId) {
          throw new Error("Permission denied!");
        }

        let modules = project.modules;
        modules.push(module);

        return project
          .update({
            modules
          })
          .then(updatedProject => {
            return updatedProject.modules;
          });
      })
      .catch(err => {
        throw err;
      });
  }

  deleteModule(module, projectId, userId) {
    if (isNaN(projectId)) {
      throw new Error("Project Id is required or invalid");
    }

    projectId = parseInt(projectId);

    return this.store.Project.findByPk(projectId)
      .then(async project => {
        if (!project) {
          throw new Error("Project not found");
        }

        if (userId !== project.userId) {
          throw new Error("Permission denied!");
        }

        let modules = project.modules;
        let index = modules.indexOf(module);
        modules.splice(index, 1);

        return project
          .update({
            modules
          })
          .then(updatedProject => {
            return updatedProject.modules;
          });
      })
      .catch(err => {
        throw err;
      });
  }

  addTag(tag, projectId, userId) {
    if (isNaN(projectId)) {
      throw new Error("Project Id is required or invalid");
    }

    projectId = parseInt(projectId);

    return this.store.Project.findByPk(projectId)
      .then(async project => {
        if (!project) {
          throw new Error("Project not found");
        }

        if (userId !== project.userId) {
          throw new Error("Permission denied!");
        }

        let tags = project.tags;
        tags.push(tag);

        return await project
          .update({
            tags
          })
          .then(updatedProject => {
            return updatedProject.tags;
          });
      })
      .catch(err => {
        throw err;
      });
  }

  deleteTag(tag, projectId, userId) {
    if (isNaN(projectId)) {
      throw new Error("Project Id is required or invalid");
    }

    projectId = parseInt(projectId);

    return this.store.Project.findByPk(projectId)
      .then(async project => {
        if (!project) {
          throw new Error("Project not found");
        }

        if (userId !== project.userId) {
          throw new Error("Permission denied!");
        }

        let tags = project.tags;
        // Delete from the array
        let index = tags.indexOf(module);
        tags.splice(index, 1);

        return await project
          .update({
            tags
          })
          .then(updatedProject => {
            return updatedProject.tags;
          });
      })
      .catch(err => {
        throw err;
      });
  }

  async deleteById(projectId, userId) {
    return await this.store.Project.destroy({
      where: {
        id: projectId,
        userId: userId
      }
    });
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
