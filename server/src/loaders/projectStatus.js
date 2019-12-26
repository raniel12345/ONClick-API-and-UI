import Sequelize from "sequelize";

export const batchStatus = async (keys, store) => {
  const statuses = await store.ProjectStatus.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: keys
      }
    }
  });

  return keys.map(key => statuses.find(status => status.id === key));
};
