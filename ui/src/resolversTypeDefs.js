import gql from 'graphql-tag';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        # projects: [Project!]
    }

    # extend type Launch {
    #     isInCart: Boolean!
    # }

    # extend type Mutation {
    #     addOrRemoveFromCart(id: ID!): [Launch]
    # }
`;

export const resolvers = {};
