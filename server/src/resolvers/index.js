import { GraphQLDateTime, GraphQLDate } from "graphql-iso-date";

import userResolvers from "./user";
import projectResolvers from "./project";
import projectMemberResolvers from "./member";
import projectStatusResolvers from "./projectStatus";
import GroupResolvers from "./group";
import FeatureResolvers from "./projectFeature";
import IssueResolvers from "./projectIssue";

const customScalarResolver = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime
};

export default [
  customScalarResolver,
  userResolvers,
  projectResolvers,
  projectMemberResolvers,
  projectStatusResolvers,
  GroupResolvers,
  FeatureResolvers,
  IssueResolvers
];
