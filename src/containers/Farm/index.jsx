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

        console.log("project inside", project);
        const farm =  controllerData && controllerData["points"] ? controllerData["points"] : [];

        return(
            <Container className="dashboard">
                <Row>
                    <ExampleCard />
                </Row>
                <Row>
                    <Col md={4}>
                        <SVG farm={farm}/>
                    </Col>
                </Row>
            </Container>
        );
    }
};


export default withRouter(connect(state => ({
    socket: state.socket,
    project: state.project,
    controllerData: state.controllerData
}))(Farm));
