import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SVG from '../Svg/index';

class Farm extends Component {

    state = {
        data: [],
    };

    componentDidMount(){

    }

    render(){
        const {project, controllerData} = this.props;
        const farmData =  controllerData && controllerData["points"] && controllerData["pointsIds"] ? controllerData : false;

        return(
            <Container className="dashboard">
                <Row>
                    <ExampleCard />
                </Row>
                <Row>
                    <Col md={4}>
                        <SVG farm={farmData}/>
                    </Col>
                </Row>
            </Container>
        );
    }
};


export default withRouter(connect(state => ({
    socket: state.socket,
    project: state.project,
    controllerData: state.controllerData,
    colorData: state.colorData
}))(Farm));
