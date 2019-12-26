import { gql } from "apollo-server";

export default gql`
  enum ProjectRoles {
    Developer
    Reporter
    Observer
  }

  type UserMember {
    id: ID!
    users: User!
    role: ProjectRoles!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
  }

  type GroupMember {
    id: ID!
    group: UserGroup!
    role: ProjectRoles!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
  }

  type ProjectMembers {
    user: [UserMember!]
    groups: [GroupMember!]
  }

  enum memberType {
    User
    Group
  }

  input ProjectMemberInput {
    projectID: ID!
    """
    Member Type: User or Group
    """
    memberType: memberType!
    """
    it can be User ID or Group ID
    """
    memberID: ID!
  }

  extend type Query {
    ProjectMembers(projectID: ID!): ProjectMembers!
  }

  extend type Mutation {
    addProjectMember(input: ProjectMemberInput): ProjectMembers!
  }
`;
