import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "./user";
import projectResolvers from "./project";
import projectStatusResolvers from "./projectStatus";
import GroupResolvers from "./group";

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  customScalarResolver,
  userResolvers,
  projectResolvers,
  projectStatusResolvers,
  GroupResolvers
];
