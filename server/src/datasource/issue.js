import { DataSource } from 'apollo-datasource';
// import { AuthenticationError, UserInputError } from 'apollo-server';
// import Sequelize from 'sequelize';
// const Op = Sequelize.Op;

export default class IssueAPI extends DataSource {
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
        return await this.store.ProjectIssue.findAll({
            where: {
                projectId: projectId
            }
        });
    }

    async getById(projectId, issueId) {
        return await this.store.ProjectIssue.findAll({
            where: {
                projectId: projectId,
                id: issueId
            }
        });
    }

    async createNew(issueInput) {
        const {
            projectId,
            title,
            description,
            priority,
            issueType,
            status,
            percentCompletion,
            estimatedTime,
            spentTime,
            startDate,
            dueDate
        } = issueInput;

        return await this.store.Project.findByPk(projectId)
            .then(async project => {
                return await project.createProjectIssue({
                    title,
                    description,
                    priority,
                    issueType,
                    status,
                    percentCompletion,
                    estimatedTime,
                    spentTime,
                    startDate,
                    dueDate
                });
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    async updateIssue(issueInput, issueId) {
        const {
            projectId,
            title,
            description,
            priority,
            issueType,
            status,
            percentCompletion,
            estimatedTime,
            spentTime,
            startDate,
            dueDate
        } = issueInput;

        if (isNaN(issueId)) {
            throw new Error('Issue id is required or invalid');
        }

        if (isNaN(projectId)) {
            throw new Error('Project id is required or invalid');
        }

        issueId = parseInt(issueId);
        const projectID = parseInt(projectId);

        const project = await this.store.Project.findByPk(projectID);
        const issue = await this.store.ProjectIssue.findByPk(issueId);

        if (!project) {
            throw new Error('Project not found');
        }

        if (!issue) {
            throw new Error('Issue not found');
        }

        return await issue.update({
            title,
            description,
            priority,
            issueType,
            status,
            percentCompletion,
            estimatedTime,
            spentTime,
            startDate,
            dueDate
        });
    }

    async deleteIssue(issueId) {
        if (isNaN(issueId)) {
            throw new Error('Issue id is required or invalid');
        }
        issueId = parseInt(issueId);

        return await this.store.ProjectIssue.findByPk(issueId).then(async issue => {
            return await issue.destroy();
        });
    }
}
