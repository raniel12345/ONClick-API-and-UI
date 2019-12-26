export default {
  Query: {
    projectStatuses: async (parent, args, { me, dataSources }) => {
      return await dataSources.ProjectStatusAPI.getAll(me.id);
    }
  },
  Mutation: {
    createProjectStatus: async (
      parent,
      { status, description },
      { me, dataSources }
    ) => {
      return await dataSources.ProjectStatusAPI.createNew(
        status,
        description,
        me.id
      );
    }
  }
};
