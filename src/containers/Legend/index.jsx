import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const ExamplePage = (props) => {
    return(<Container className="dashboard">
        <Row>
            <Col md={12}>
            </Col>
        </Row>
        <Row>
            <ExampleCard />
        </Row>
    </Container>);
}


export default withRouter(connect(state => ({
    user: state.user,
}))(ExamplePage));
