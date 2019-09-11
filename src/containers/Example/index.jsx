import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SVG from '../Svg/index';

class ExamplePage extends Component {

    state = {
        data: [],
        projectLocal: null
    };

    componentDidMount(){
        const {socket} = this.props;

        socket.on("getController", data => {
            this.setState({data: data});
        });
    }

    getData() {
        const {project, socket} = this.props;

        socket.emit("QueryData", {
            type: "getController",
            params: [project],
            password: "aki password"
        });

        this.setState({projectLocal: project})
    }

    render(){
        const {data, projectLocal} = this.state;
        const {project} = this.props;

        console.log("project inside", project);

        if(project && project !== projectLocal){
            this.getData()
        }

        return(
            <Container className="dashboard">
                <Row>
                    <ExampleCard />
                </Row>
                <Row>
                    <Col md={4}>
                        <SVG farm={data}/>
                    </Col>
                </Row>
            </Container>
        );
    }
};


export default withRouter(connect(state => ({
    socket: state.socket,
    project: state.project
}))(ExamplePage));
