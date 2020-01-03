import Sequelize from 'sequelize';

export const batchUsers = async (keys, store) => {
    const users = await store.User.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: keys
            }
        }
    });

    return keys.map(key => users.find(user => user.id === key));
};
