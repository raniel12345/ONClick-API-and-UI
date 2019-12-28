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

  async getById(groupId) {
    return await this.store.Group.findByPk(groupId);
  }

  async getAll() {
    return await this.store.Group.findAll();
  }

  async createNew(title, description) {
    return await this.store.Group.create({
      title,
      description
    });
  }

  async updateGroup(id, title, description) {
    return await this.store.Group.findByPk(id).then(async group => {
      return await group.update({
        title,
        description
      });
    });
  }
}
