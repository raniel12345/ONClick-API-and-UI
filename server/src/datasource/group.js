import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server';

export default class GroupAPI extends DataSource {
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

    async getAllMembersIdById(groupId) {
        return await this.store.GroupUser.findAll({
            where: {
                groupId: groupId
            }
        }).then(members => {
            return members ? members.map(m => m.userId) : [];
        });
    }

    async getAllGroupsIdById(userId) {
        return await this.store.GroupUser.findAll({
            where: {
                userId: userId
            }
        }).then(groups => {
            return groups ? groups.map(g => g.groupId) : [];
        });
    }

    async createNew(title, description) {
        return await this.store.Group.create({
            title,
            description
        });
    }

    async updateGroup(id, title, description) {
        return await this.store.Group.findByPk(id)
            .then(async group => {
                return await group.update({
                    title,
                    description
                });
            })
            .catch(err => {
                throw new UserInputError('Group not found');
            });
    }
}
