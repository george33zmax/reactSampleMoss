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
        const {controllerData} = this.props;
        const farmData =  controllerData && controllerData["points"] && controllerData["pointsIds"] ? controllerData : false;

        return(
            <div className='dashboard__content'>

                    <ExampleCard />

                <div className="farm">
                    <SVG farm={farmData}/>
                </div>


            </div>
        );
    }
};

export default withRouter(connect(state => ({
    socket: state.socket,
    project: state.project,
    controllerData: state.controllerData,
    colorData: state.colorData
}))(Farm));
