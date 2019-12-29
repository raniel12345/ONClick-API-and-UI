import { DataSource } from "apollo-datasource";
import { AuthenticationError, UserInputError } from "apollo-server";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default class FeatureAPI extends DataSource {
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

  async getAll(projectId) {
    return await this.store.ProjectFeature.findAll({
      where: {
        projectId: projectId
      }
    });
  }

  async getById(projectId, featureId) {
    return await this.store.ProjectFeature.findAll({
      where: {
        id: featureId,
        projectId: projectId
      }
    });
  }

  async createNew(featureInput) {
    console.log(featureInput);
    const {
      projectId,
      title,
      description,
      priority,
      status,
      percentCompletion,
      startDate,
      dueDate
    } = featureInput;

    return await this.store.Project.findByPk(projectId)
      .then(async project => {
        // console.log(project);
        return await project.createProjectFeature({
          title,
          description,
          priority,
          status,
          percentCompletion,
          startDate,
          dueDate
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  async updateFeature(featureInput, featureId) {
    const {
      projectId,
      title,
      description,
      priority,
      status,
      percentCompletion,
      startDate,
      dueDate
    } = featureInput;

    if (isNaN(featureId)) {
      throw new Error("Feature id is required or invalid");
    }

    if (isNaN(projectId)) {
      throw new Error("Project id is required or invalid");
    }

    featureId = parseInt(featureId);
    const projectID = parseInt(projectId);

    const project = await this.store.Project.findByPk(projectID);
    const feature = await this.store.ProjectFeature.findByPk(featureId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (!feature) {
      throw new Error("Feature not found");
    }

    return feature.update({
      title,
      description,
      priority,
      status,
      percentCompletion,
      startDate,
      dueDate
    });
  }

  async deleteProjectFeature(featureId) {
    if (isNaN(featureId)) {
      throw new Error("Feature id is required or invalid");
    }
    featureId = parseInt(featureId);

    return await this.store.ProjectFeature.findByPk(featureId).then(
      async feature => {
        return await feature.destroy();
      }
    );
  }
}
