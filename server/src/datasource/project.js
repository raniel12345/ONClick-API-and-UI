import { DataSource } from "apollo-datasource";
import { AuthenticationError } from "apollo-server";
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

  async deleteById(projectId, userId) {
    return await this.store.Project.destroy({
      where: {
        id: projectId,
        userId: userId
      }
    });
  }
}
