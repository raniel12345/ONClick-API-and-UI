// import bcrypt from "bcryptjs";
import utils from "../utils";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [7, 250]
        }
      },
      role: {
        type: DataTypes.STRING
      }
    },
    {
      paranoid: true
    }
  );

  User.associate = models => {
    User.hasMany(models.Project);
    User.hasMany(models.ProjectStatus);
    User.belongsToMany(models.Group, {
      through: models.GroupUsers,
      as: "groups",
      foreignKey: "userId"
    });
    User.belongsToMany(models.Project, {
      through: models.PerUserProjectMember,
      foreignKey: "userId"
    });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.beforeUpdate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    // const salt = await bcrypt.genSalt(10);
    // return await bcrypt.hash(this.password, salt);
    return await utils.hashing.generateHash(this.password, 10);
  };

  User.prototype.validatePassword = async function(password) {
    // return await bcrypt.compare(password, this.password);
    return await utils.hashing.compareHash(password, this.password);
  };

  return User;
};

export default user;
