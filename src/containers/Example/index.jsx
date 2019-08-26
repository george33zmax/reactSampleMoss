import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
const SVG = require('react-svg-draw');
const {Circle, Defs, G, Rect, Use} = SVG;

const ExamplePage = (props) => {
    return(<Container className="dashboard">
        <Row>
            <Col md={12}>
            </Col>
        </Row>
        <Row>
            <ExampleCard />
            <SVG>
                <Defs>
                    <G id="shape">
                        <Rect x="20" y="50" width="100" height="30" />
                        {/*<Circle cx="50" cy="50" r="50" />*/}
                    </G>
                </Defs>
                <Use xlinkHref="#shape" x="30" y="50" />
                {/*<Use xlinkHref="#shape" x="200" y="50" />*/}
            </SVG>
        </Row>
    </Container>);
}


export default withRouter(connect(state => ({
    user: state.user,
}))(ExamplePage));
