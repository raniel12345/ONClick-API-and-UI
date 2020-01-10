import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';

export const LOGIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(login: $email, password: $password) {
            token
        }
    }
`;

export default function Login() {
    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted({ signIn }) {
            console.log(signIn);
            localStorage.setItem('token', signIn.token);
            client.writeData({ data: { isLoggedIn: true } });
        },
        onError(err) {
            console.log(err);
        }
    });

    if (loading) return <Loading />;
    if (error) return <p>An error occurred</p>;

    return <LoginForm signIn={signIn} />;
}
