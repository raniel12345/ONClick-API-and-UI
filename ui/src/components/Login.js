import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default class Login extends Component {
    state = { email: '', password: '' };

    onEmailChanged = event => {
        const emailVal = event.target.value;
        this.setState(() => {
            return {
                email: emailVal
            };
        });
    };

    onPasswordChanged = event => {
        const passVal = event.target.value;
        this.setState(() => {
            return {
                password: passVal
            };
        });
    };

    signIn = event => {
        event.preventDefault();
        this.props.signIn({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        });
    };

    render() {
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.signIn}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={this.onEmailChanged}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={this.onPasswordChanged}
                            />
                        </Form.Group>
                        <p>{this.props.errorMsg}</p>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Wrapper>
            </Container>
        );
    }
}

const Wrapper = styled.section`
    margin-top: 5rem;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
