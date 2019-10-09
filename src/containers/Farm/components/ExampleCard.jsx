import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const ExampleCard = (props) => (

  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h2 className="bold-text">{`Welcome ${props.user["name"]}`}</h2>
          <h4 className="subhead">Example subhead</h4>
        </div>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default withRouter(connect(state => ({
    user: state.user,
}))(ExampleCard));
