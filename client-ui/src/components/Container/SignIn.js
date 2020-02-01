import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SignIn from '../Presentation/SignIn';

const LOGIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(login: $email, password: $password) {
            success
            message
            token
            user {
                username
                role
                email
            }
        }
    }
`;

export default function Login() {
    const client = useApolloClient();

    const [signIn, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted({ signIn }) {
            localStorage.setItem('token', signIn.token);
            localStorage.setItem('curUserInfo', JSON.stringify(signIn.user));

            const userInfo = !!localStorage.getItem('curUserInfo')
                ? JSON.parse(localStorage.getItem('curUserInfo'))
                : {};

            client.writeData({
                data: { isLoggedIn: !!localStorage.getItem('token'), CurUserInfo: userInfo }
            });
        },
        onError(err) {
            console.log(err);
        }
    });

    if (loading) {
        return <SignIn signIn={signIn} loading info loginMsg="Processing..." />;
    }

    if (error) {
        return (
            <SignIn
                signIn={signIn}
                error
                loginMsg={error.graphQLErrors.map(({ message }, i) => (
                    <span key={i}>{message}</span>
                ))}
            />
        );
    }

    return <SignIn signIn={signIn} />;
}
