import { ApolloServer } from "apollo-server";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import "dotenv/config";

import DataLoader from "dataloader";
import dataLoaders from "./loaders";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";

import UserAPI from "./datasource/user";
import ProjectAPI from "./datasource/project";
import ProjectStatusAPI from "./datasource/projectStatus";
import GroupAPI from "./datasource/group";
import FeatureAPI from "./datasource/feature";

const is_production = process.env.NODE_ENV === "production" ? false : true;

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  /**
   * Authentitication
   */
  const token = req.headers["authorization"];
  let user = null;
  if (token) {
    try {
      user = await jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
  // else {
  //   throw new AuthenticationError("Token is required");
  // }

  /**
   * Loaders
   */
  var loaders = {
    user: new DataLoader(keys => dataLoaders.user.batchUsers(keys, models)),
    group: new DataLoader(keys => dataLoaders.group.barchGroups(keys, models)),
    projectStatus: new DataLoader(keys =>
      dataLoaders.projectStatus.batchStatus(keys, models)
    )
  };

  return {
    me: user,
    loaders,
    secret: process.env.SECRET_KEY
  };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      UserAPI: new UserAPI({ store: models }),
      ProjectAPI: new ProjectAPI({ store: models }),
      ProjectStatusAPI: new ProjectStatusAPI({ store: models }),
      GroupAPI: new GroupAPI({ store: models }),
      FeatureAPI: new FeatureAPI({ store: models })
    };
  },
  context,
  formatError: error => {
    // console.log(err);

    if (error.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }

    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  },
  // formatResponse: res => {
  //   console.log(res);
  // },
  debug: is_production
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test

sequelize
  .sync({ force: false })
  .then(async () => {
    if (process.env.NODE_ENV !== "test")
      server
        .listen({ port: 5000 })
        .then(({ url }) => console.log(`🚀 app running at ${url}`));
  })
  .catch(err => {
    console.log(err);
  });
