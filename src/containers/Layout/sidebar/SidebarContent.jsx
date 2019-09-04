import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    loaded: false
  };

  async componentDidMount(){
    const {socket} = this.props;
    const {loaded} = this.state;

    if (!loaded){
      this.setState({loaded: true})
      socket.emit("QueryData", {
        type: "getAllFarms",
        params: "aki params",
        password: "aki password"
      });
    }

    socket.on("getAllFarms", data => {
      console.log("data Response", data);
      this.setState({data: data});
    })
  }

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToDark, changeToLight } = this.props;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          {/*<SidebarLink title="Legend" icon="map" route="/legend" onClick={this.hideSidebar} />*/}
          <SidebarCategory title="Layout" icon="layers">
            <button type="button" className="sidebar__link" onClick={changeToLight}>
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button type="button" className="sidebar__link" onClick={changeToDark}>
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Projects (Farms)" icon="sun">
            <SidebarLink title="Northen Preserve" route="/projects" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  socket: state.socket
}))(SidebarContent));
