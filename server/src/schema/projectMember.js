import { gql } from "apollo-server";

export default gql`
  enum ProjectRoles {
    Developer
    Reporter
    Observer
  }

  type UserMember {
    id: ID!
    user: User!
    role: ProjectRoles!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime!
  }

  type GroupMember {
    id: ID!
    group: Group!
    role: ProjectRoles!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime!
  }

  type ProjectMembers {
    memberUsers: [UserMember!]
    memberGroups: [GroupMember!]
  }

  enum memberType {
    User
    Group
  }

  input ProjectMemberInput {
    projectId: ID!
    role: ProjectRoles!
    """
    Member Type: User or Group
    """
    memberType: memberType!
    """
    it can be User ID or Group ID
    """
    memberId: ID!
  }

  extend type Query {
    ProjectMembers(projectId: ID!): ProjectMembers!
    ProjectUsersMembers(projectId: ID!): [UserMember!]
    ProjectGroupsMembers(projectId: ID!): [GroupMember!]
  }

  extend type Mutation {
    addProjectMember(input: ProjectMemberInput): ProjectMembers!
  }
`;
