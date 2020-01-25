import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { resolvers, typeDefs } from './resolvers';

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
cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token')
        // projects: []
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
