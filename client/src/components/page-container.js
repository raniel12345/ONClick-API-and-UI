import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import TopBar from './topnav';

export default function PageContainer(props) {
    return (
        <Fragment>
            <TopBar />
            <Container>{props.children}</Container>
        </Fragment>
    );
}

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    padding: 10 * 3,
    paddingBottom: 10 * 5
});
