import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SignIn from '../Presentation/SignIn';

export const LOGIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(login: $email, password: $password) {
            token
        }
    }
`;
// export const GET_CURRENT_USER_INFO = gql`
//     query GetCurUserInfo {
//         me {
//             username
//             email
//             role
//         }
//     }
// `;

export default function Login() {
    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted({ signIn }) {
            localStorage.setItem('token', signIn.token);
            client.writeData({ data: { isLoggedIn: true } });
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
