import Sequelize from 'sequelize';

export const barchGroups = async (keys, store) => {
    const groups = await store.Group.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: keys
            }
        }
    });

    return keys.map(key => groups.find(group => group.id === key));
};
