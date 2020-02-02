import { DataSource } from 'apollo-datasource';
// import { AuthenticationError, UserInputError } from 'apollo-server';
import Sequelize from 'sequelize';
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

    async getBySlug(slug) {
        return await this.store.Project.findAll({
            where: {
                slug: slug
            }
        });
    }

    async searchProjects(searchStr, userId, isAdmin) {
        if (isAdmin && isAdmin === true) {
            return await this.store.Project.findAll({
                where: {
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${searchStr}%`
                            }
                        },
                        {
                            tags: {
                                [Op.contains]: [searchStr]
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${searchStr}%`
                            }
                        }
                    ]
                }
            });
        }

        return await this.store.Project.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchStr}%`
                        }
                    },
                    {
                        tags: {
                            [Op.contains]: [searchStr]
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${searchStr}%`
                        }
                    }
                ],
                userId: userId
            }
        });
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

        let isAllowedToUseThisStatus = await this.store.ProjectStatus.findOne({
            where: {
                id: initialStatus,
                userId
            }
        });

        if (!isAllowedToUseThisStatus) {
            throw new Error('Status not found on your list! - Invalid Status');
        }

        return await this.store.User.findByPk(userId)
            .then(async user => {
                return await user.createProject(
                    {
                        ticketNo: 'temp',
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
        let { id, title, subProject, description, homePage, isPublic } = projectInput;

        if (isNaN(id)) {
            throw new Error('Id is required or invalid');
        }

        id = parseInt(id);

        return this.store.Project.findByPk(id)
            .then(async project => {
                if (!project) {
                    throw new Error('Project not found');
                }

                if (userId !== project.userId) {
                    throw new Error('Permission denied!');
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
            throw new Error('Project Id is required or invalid');
        }

        projectId = parseInt(projectId);

        return this.store.Project.findByPk(projectId)
            .then(async project => {
                if (!project) {
                    throw new Error('Project not found');
                }

                if (userId !== project.userId) {
                    throw new Error('Permission denied!');
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
            throw new Error('Project Id is required or invalid');
        }

        projectId = parseInt(projectId);

        return this.store.Project.findByPk(projectId)
            .then(async project => {
                if (!project) {
                    throw new Error('Project not found');
                }

                if (userId !== project.userId) {
                    throw new Error('Permission denied!');
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
            throw new Error('Project Id is required or invalid');
        }

        projectId = parseInt(projectId);

        return this.store.Project.findByPk(projectId)
            .then(async project => {
                if (!project) {
                    throw new Error('Project not found');
                }

                if (userId !== project.userId) {
                    throw new Error('Permission denied!');
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
            throw new Error('Project Id is required or invalid');
        }

        projectId = parseInt(projectId);

        return this.store.Project.findByPk(projectId)
            .then(async project => {
                if (!project) {
                    throw new Error('Project not found');
                }

                if (userId !== project.userId) {
                    throw new Error('Permission denied!');
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

    async deleteById(isAdmin, projectId, userId) {
        const results = {
            isDone: false,
            msg: ''
        };

        if (isAdmin && isAdmin === true) {
            results.isDone = Boolean(
                await this.store.Project.destroy({
                    where: {
                        id: projectId
                    }
                })
            );
            results.msg = 'Deleted successfully!';

            return results;
        }

        const projectToDelete = this.getById(projectId, userId);

        return projectToDelete
            .then(async project => {
                if (!project || project.length === 0) {
                    results.isDone = false;
                    results.msg = 'Permission denied!';
                    return results;
                } else {
                    if (parseInt(project[0].userId) !== parseInt(userId)) {
                        results.isDone = false;
                        results.msg = 'Permission denied!';
                        return results;
                    }
                    const isDone = Boolean(await project[0].destroy());
                    if (isDone) {
                        results.isDone = true;
                        results.msg = 'Deleted Successfully!';
                    } else {
                        results.isDone = true;
                        results.msg = 'Unable to delete this project';
                    }

                    return results;
                }
            })
            .catch(err => {
                throw err;
            });
    }
}
