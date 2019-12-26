export default {
  Query: {
    projects: async (_, __, { dataSources }) => {
      return await dataSources.ProjectAPI.getAll();
    },
    project: async (_, { id }, { me, dataSources }) => {
      const project = await dataSources.ProjectAPI.getById(id, me.id);
      return project[0];
    }
  },
  Mutation: {
    createProject: async (_, { input }, { me: { id }, dataSources }) => {
      return await dataSources.ProjectAPI.createNew(input, id);
    },
    deleteProject: async (parent, { id, userId }, { me, dataSources }) => {
      console.log(me);
      console.log(id);
      console.log(userId);

      if (
        me &&
        me.role &&
        me.role === "ADMIN" &&
        typeof userId === "undefined"
      ) {
        throw new Error("User id is required");
      }

      if (
        me &&
        me.role &&
        me.role === "ADMIN" &&
        me.id &&
        parseInt(userId) !== me.id
      ) {
        const projectToDelete = dataSources.ProjectAPI.getById(id, userId);

        return projectToDelete
          .then(async project => {
            if (await dataSources.ProjectAPI.deleteById(id, userId)) {
              return {
                success: true,
                message: "Deleted successfully!",
                project: project[0]
              };
            }

            throw new Error("Unable to delete this project");
          })
          .catch(err => {
            throw err;
          });
      }

      const projectToDelete = dataSources.ProjectAPI.getById(id, me.id);

      return projectToDelete
        .then(async project => {
          console.log(project);
          if (await dataSources.ProjectAPI.deleteById(id, me.id)) {
            return {
              success: true,
              message: "Deleted successfully!",
              project: project[0]
            };
          }

          throw new Error("Unable to delete this project");
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Project: {
    owner: async (project, args, { loaders }) => {
      return await loaders.user.load(project.userId);
    },
    status: async (project, args, { loaders }) => {
      return await loaders.projectStatus.load(project.projectStatusId);
    }
  }
};
