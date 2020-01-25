import gql from 'graphql-tag';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        curUserInfo: UserInfo!
        # projects: [Project!]
    }

    type UserInfo {
        username: String!
        email: String!
        role: String!
    }

    # extend type Launch {
    #     isInCart: Boolean!
    # }

    # extend type Mutation {
    #     addOrRemoveFromCart(id: ID!): [Launch]
    # }
`;

export const resolvers = {};
