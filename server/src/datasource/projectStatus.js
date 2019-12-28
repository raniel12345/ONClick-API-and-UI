import { DataSource } from "apollo-datasource";

export default class ProjectStatusAPI extends DataSource {
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

  async getAll(userId) {
    return await this.store.ProjectStatus.findAll({
      where: { userId }
    });
  }

  async createNew(status, description, userId) {
    let existingStatus = await this.store.ProjectStatus.findOne({
      where: {
        status
      }
    });

    if (existingStatus) {
      return {
        success: false,
        message: "Status already added",
        projectStatus: {
          status: "",
          description: ""
        }
      };
    }

    let user = await this.store.User.findOne({
      where: {
        id: userId
      }
    });

    let projectStatus = await user.createProjectStatus({
      status,
      description
    });

    if (projectStatus) {
      return {
        success: true,
        message: "Successfully created",
        projectStatus: projectStatus
      };
    } else {
      return {
        success: false,
        message: "Creating status failed",
        projectStatus: projectStatus
      };
    }
  }
}
