import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useApolloClient } from '@apollo/react-hooks';

export default function TopBar(props) {
    const client = useApolloClient();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/" href="#home">
                ONClick
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {props.isLoggedIn ? (
                        <Fragment>
                            <Nav.Link as={Link} to="/projects" href="#features">
                                My Projects
                            </Nav.Link>
                            <Nav.Link as={Link} to="/create-project" href="#create-new-project">
                                Create new project
                            </Nav.Link>
                        </Fragment>
                    ) : null}

                    <Nav.Link as={Link} to="/help" href="#help">
                        Help
                    </Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                </Nav>
                <Nav>
                    {props.isLoggedIn ? (
                        <Fragment>
                            <NavDropdown title="Raniel Garcia" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    as={Link}
                                    to="/"
                                    href="#action/3.4"
                                    onClick={() => {
                                        client.writeData({ data: { isLoggedIn: false } });
                                        localStorage.clear();
                                    }}
                                >
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Fragment>
                    ) : (
                        <Nav.Link as={Link} to="/login" href="#deets">
                            Sign in
                        </Nav.Link>
                    )}

                    {/* <Nav.Link href="#deets">Sign out</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
