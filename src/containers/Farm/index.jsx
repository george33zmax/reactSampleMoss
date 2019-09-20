import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SVG from '../Svg/index';

const colors = {
    0 : '#3072B2',
    1 : '#5C9E1F',
    2 : '#8A3F95',
    3 : '#1AD0D0',
    4 : '#FF750B',
    5 : '#A77F06',
    6 : '#FB75B8',
    7 : '#A7EA22',
    8 : '#7675D1',
    9 : '#9E4B1F',
    10 : '#B46DB8',
    11 : '#CC7A0B',
    12 : '#199E71',
    13 : '#F5EB5B',
    14 : '#B8E5FE',
    15 : '#83D3C2',
    16 : '#FEA55D',
    17 : '#FECCE4',
    18 : '#E35103',
    19 : '#B7B1D8',
    20 : '#FC725D',
    21 : '#72A3C9',
    22 : '#F799AF',
    23 : '#2E2E30',
    24 : '#CA9731',
};

class Farm extends Component {

    state = {
        data: [],
    };

    componentDidMount(){

    }

    render(){
        const {project, controllerData} = this.props;

        // console.log("project inside", project);
        console.log("controllerData", controllerData);
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
