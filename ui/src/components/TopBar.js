import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Breadcrumb } from 'react-bootstrap';
import { useApolloClient } from '@apollo/react-hooks';

import styled from 'styled-components';

export default function TopBar(props) {
    const client = useApolloClient();

    return (
        <Fragment>
            <div className="container-fluid">
                <Navbar>
                    <Navbar.Brand href="#home">
                        <h2>Raniel Garci's Team</h2>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    as={Link}
                                    to="/"
                                    href="#action/3.4"
                                    onClick={() => {
                                        client.writeData({
                                            data: { isLoggedIn: false }
                                        });
                                        localStorage.clear();
                                    }}
                                >
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container-fluid">
                    <Navbar.Brand as={Link} to="/" href="#home">
                        ONClick
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {props.isLoggedIn ? (
                                <Fragment>
                                    <Nav.Link as={Link} to="/projects" href="#features">
                                        Projects
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/create-project"
                                        href="#create-new-project"
                                    >
                                        New project
                                    </Nav.Link>
                                </Fragment>
                            ) : null}

                            <Nav.Link as={Link} to="/help" href="#help">
                                Help
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            {/* <div className="container-fluid">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
        </Fragment>
    );
}
