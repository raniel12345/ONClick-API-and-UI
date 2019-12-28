import date from "date-and-time";

const project = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project",
    {
      ticketNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      subProject: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      homePage: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      modules: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      paranoid: true
    }
  );

  Project.associate = models => {
    Project.belongsTo(models.User);
    Project.belongsTo(models.ProjectStatus);
    Project.hasMany(models.ProjectFeature);
    Project.hasMany(models.ProjectIssue);
    Project.belongsToMany(models.User, {
      through: models.PerUserProjectMember,
      foreignKey: "projectId"
    });
    Project.belongsToMany(models.GroupUser, {
      through: models.PerGroupProjectMember,
      foreignKey: "projectId"
    });
  };

  Project.beforeCreate(async project => {
    const now = new Date();
    project.ticketNo = date.format(now, "YYYYMMDDHHmmssSSS");
  });

  return Project;
};

export default project;
