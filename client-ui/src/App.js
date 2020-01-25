import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import gql from 'graphql-tag';
import { useApolloClient, useQuery } from '@apollo/react-hooks';

import AppContainer from './components/AppContainer';
import SignIn from './components/Container/SignIn';

// localStorage.clear();

function IsLoggedIn() {
    const IS_LOGGED_IN = gql`
        query IsUserLoggedIn {
            isLoggedIn @client
        }
    `;

    const { data } = useQuery(IS_LOGGED_IN);
    const { isLoggedIn } = data;

    return isLoggedIn ? <AppContainer /> : <SignIn />;
}

function App() {
    return (
        <Fragment>
            <CssBaseline />
            <IsLoggedIn />
        </Fragment>
    );
}

export default App;
