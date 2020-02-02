import { combineResolvers } from 'graphql-resolvers';
// import { ForbiddenError } from "apollo-server";
import { isAuthenticated } from './authorization';

export default {
    Query: {
        projects: combineResolvers(isAuthenticated, async (_, __, { me, dataSources }) => {
            return await dataSources.ProjectAPI.getAllByUserId(me.id);
        }),
        project: combineResolvers(isAuthenticated, async (_, { id }, { me, dataSources }) => {
            const project = await dataSources.ProjectAPI.getById(id, me.id);
            return project[0];
        }),
        searchProjects: combineResolvers(
            isAuthenticated,
            async (_, { searchStr }, { me: { id, role }, dataSources, isAdmin }) => {
                return await dataSources.ProjectAPI.searchProjects(searchStr, id, isAdmin(role));
            }
        )
    },
    Mutation: {
        createProject: combineResolvers(
            isAuthenticated,
            async (_, { input }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.createNew(input, id);
            }
        ),
        deleteProject: combineResolvers(
            isAuthenticated,
            async (parent, { id, userId }, { me, dataSources }) => {
                if (me && me.role && me.role === 'ADMIN' && typeof userId === 'undefined') {
                    throw new Error('User id is required');
                }

                const isAdmin = me && me.role && me.role === 'ADMIN' ? true : false;

                const userIdTmp = isAdmin ? userId : me.id;
                const { isDone, msg } = await dataSources.ProjectAPI.deleteById(
                    isAdmin,
                    id,
                    userIdTmp
                );

                return {
                    success: isDone,
                    message: msg
                };
            }
        ),
        updateProject: combineResolvers(
            isAuthenticated,
            async (_, { input }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.updateProject(input, id);
            }
        ),
        addProjectModule: combineResolvers(
            isAuthenticated,
            async (_, { module, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.addModule(module, projectId, id);
            }
        ),
        deleteProjectModule: combineResolvers(
            isAuthenticated,
            async (_, { module, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.deleteModule(module, projectId, id);
            }
        ),
        addProjectTag: combineResolvers(
            isAuthenticated,
            async (_, { tag, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.addTag(tag, projectId, id);
            }
        ),
        deleteProjectTag: combineResolvers(
            isAuthenticated,
            async (_, { tag, projectId }, { me: { id }, dataSources }) => {
                return await dataSources.ProjectAPI.deleteTag(tag, projectId, id);
            }
        )
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
