import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { useApolloClient } from '@apollo/react-hooks';

export default function LogoutButton() {
    const client = useApolloClient();
    return (
        <StyledButton
            data-testid="logout-button"
            onClick={() => {
                client.writeData({ data: { isLoggedIn: false } });
                localStorage.clear();
            }}
        >
            Logout
        </StyledButton>
    );
}

const StyledButton = styled('button')({
    background: 'none',
    border: 'none',
    padding: 0
});
