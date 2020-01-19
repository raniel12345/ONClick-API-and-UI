import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class ProjectList extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={8} sm={8} md={8} large={8}>
                        Test
                    </Col>
                    <Col xs={4} sm={8} md={4} large={4}>
                        Test
                    </Col>
                </Row>
            </Container>
        );
    }
}
