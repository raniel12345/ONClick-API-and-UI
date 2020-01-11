import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// import Pages from './pages';
import Login from './pages/login';
import Pages from './pages';
import { resolvers, typeDefs } from './resolvers_typeDefs';
import injectStyles from './styles';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://localhost:5000/',
        headers: {
            authorization: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            'client-name': 'ONClick [web]',
            'client-version': '1.0.0'
        }
    }),
    resolvers,
    typeDefs
});

// console.log(localStorage.getItem('token'));
// localStorage.clear();

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token')
        // projects: []
    }
});

/**
 * Render our app
 * - We wrap the whole app with ApolloProvider, so any component in the app can
 *    make GraphqL requests. Our provider needs the client we created above,
 *    so we pass it as a prop
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN);
    // console.log(data);
    return data.isLoggedIn ? <Pages /> : <Login />;
    // return <Login />; //<Pages />
}

injectStyles();

ReactDOM.render(
    <ApolloProvider client={client}>
        <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root')
);
