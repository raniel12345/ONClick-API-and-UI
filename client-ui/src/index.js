import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import ApolloClient, { InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { resolvers, typeDefs } from './resolvers';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    uri: 'http://localhost:5000/',
    request: operation => {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        operation.setContext({
            headers: {
                authorization: token,
                'client-name': 'ONClick [web]',
                'client-version': '1.0.0'
            }
        });
    },
    resolvers,
    typeDefs,
    onError: error => {
        console.log(error);

        if (error.graphQLErrors && error.graphQLErrors !== 'undefined') {
            error.graphQLErrors.map(({ message, extensions }, i) => {
                console.log(message);
                if (extensions.code === 'UNAUTHENTICATED') {
                    localStorage.clear();
                    cache.writeData({
                        data: {
                            isLoggedIn: !!localStorage.getItem('token')
                        }
                    });
                }
            });
        }
    }
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        CurUserInfo: !!localStorage.getItem('curUserInfo')
            ? JSON.parse(localStorage.getItem('curUserInfo'))
            : {}
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
