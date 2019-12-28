import { DataSource } from "apollo-datasource";
import utils from "../utils";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

const tokenExpiration = process.env.TOKEN_EXP_TIME || "30m";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, { expiresIn });
};

export default class UserAPI extends DataSource {
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
   *Get all users
   */

  async getAll() {
    return await this.store.User.findAll({
      include: [this.store.Project]
    });
  }

  /**
   *Get by Id
   */
  async getById(userId) {
    return await this.store.User.findByPk(userId);
  }

  async getMeInfo() {
    if (this.context.me && this.context.me.id) {
      return await this.getById(this.context.me.id);
    }
    return {};
  }

  /**
   * Create new user or sign up
   */
  async createNew({ username, email, password, role }, secret) {
    const checkUser = await this.store.User.findOne({
      where: {
        [Op.or]: {
          email: {
            [Op.eq]: email
          },
          username: {
            [Op.eq]: username
          }
        }
      }
    });

    if (checkUser) {
      return {
        success: false,
        message: "Username or Email already used",
        token: ""
      };
    }

    return await this.store.User.create({
      username,
      email,
      password,
      role
    })
      .then(async user => {
        return {
          success: true,
          message: "Signup Successfully",
          token: await createToken(user, secret, tokenExpiration)
        };
      })
      .catch(err => {
        throw err;
        // return {
        //   success: false,
        //   message: "Internal error",
        //   token: ""
        // };
      });
  }

  /**
   * Update user password
   */
  async updatePassword({ id, currentPwd, newPwd }, secret) {
    let curUser = await this.store.User.findByPk(id);

    if (!curUser) {
      throw new UserInputError("User not found");
    }

    if (!(await curUser.validatePassword(currentPwd))) {
      throw new UserInputError("Invalid current password");
    }

    return await this.store.User.findByPk(id)
      .then(async user => {
        return await user
          .update({
            password: newPwd
          })
          .then(async updatedUser => {
            return {
              success: true,
              message: "Password Updated",
              token: await createToken(updatedUser, secret, tokenExpiration)
            };
          });
      })
      .catch(err => {
        throw err;
      });
  }

  async updateRole({ id, newRole }, secret) {
    let curUser = await this.store.User.findByPk(id);

    if (!curUser) {
      throw new UserInputError("User not found");
    }

    return await this.store.User.findByPk(id)
      .then(async user => {
        return await user
          .update({
            role: newRole
          })
          .then(async updatedUser => {
            return {
              success: true,
              message: "Role Updated",
              token: await createToken(updatedUser, secret, tokenExpiration)
            };
          });
      })
      .catch(err => {
        throw err;
      });
  }

  /**
   * User SignIn or Login
   */
  async signIn({ login, password }, secret) {
    const user = await this.store.User.findByLogin(login);

    if (!user) {
      throw new UserInputError("No user found with this login credentials.");
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      throw new AuthenticationError("Invalid password.");
    }

    return {
      success: true,
      message: "",
      token: await createToken(user, secret, tokenExpiration)
    };
  }

  /**
   * Delete User by Id
   */
  async deleteById(userId) {
    return await this.store.User.destroy({
      where: { id: userId }
    });
  }
}

// module.exports = UserAPI;
