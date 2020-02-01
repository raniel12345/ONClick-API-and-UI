import gql from 'graphql-tag';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        CurUserInfo: User!
        # projects: [Project!]
    }

    # type UserInfo {
    #     username: String!
    #     email: String!
    #     role: String!
    # }

    # extend type Launch {
    #     isInCart: Boolean!
    # }

    # extend type Mutation {
    #     AddCurUserInfo(username: String!, email: String, role: UserRole): [UserInfo]
    # }
`;

export const resolvers = {};
