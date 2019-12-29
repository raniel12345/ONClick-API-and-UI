import { GraphQLDateTime, GraphQLDate } from "graphql-iso-date";

import userResolvers from "./user";
import projectResolvers from "./project";
import projectStatusResolvers from "./projectStatus";
import GroupResolvers from "./group";
import FeatureResolvers from "./projectFeature";

const customScalarResolver = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime
};

export default [
  customScalarResolver,
  userResolvers,
  projectResolvers,
  projectStatusResolvers,
  GroupResolvers,
  FeatureResolvers
];
