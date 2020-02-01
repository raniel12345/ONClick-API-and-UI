import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import AppContainer from './components/AppContainer';
import SignIn from './components/Container/SignIn';

function SignInRouter() {
    return (
        <Fragment>
            <Switch>
                <Route path="/sign-in">
                    <SignIn />
                </Route>
            </Switch>
            <Redirect to="/sign-in" />
        </Fragment>
    );
}

function MainRouter() {
    return (
        <Fragment>
            <Switch>
                <Route path="/">
                    <AppContainer />
                </Route>
            </Switch>
            <Redirect to="/" />
        </Fragment>
    );
}

// localStorage.clear();

function IsLoggedIn() {
    const IS_LOGGED_IN = gql`
        query IsUserLoggedIn {
            isLoggedIn @client
        }
    `;

    const result = useQuery(IS_LOGGED_IN);

    console.log(result);
    const { data } = result;

    if (data && data !== 'undefined') {
        const { isLoggedIn } = data;
        return isLoggedIn ? <MainRouter /> : <SignInRouter />;
    }

    return <SignInRouter />;
}

function App(props) {
    return (
        <Fragment>
            <CssBaseline />
            <IsLoggedIn />
        </Fragment>
    );
}

export default App;
