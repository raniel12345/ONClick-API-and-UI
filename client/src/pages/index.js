import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import { PageContainer } from '../components';

import Home from './home';

export default function Pages() {
    return (
        <Fragment>
            <PageContainer>
                <Router primary={false} component={Fragment}>
                    <Home path="/" />
                </Router>
            </PageContainer>
        </Fragment>
    );
}
