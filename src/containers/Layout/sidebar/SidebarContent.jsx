import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setActiveProject} from "../../../redux/actions/projectActions";

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    loaded: false,
  };

  async componentDidMount(){
    const {socket, project} = this.props;
    const {loaded} = this.state;

    this.setState({project: project});
    if (!loaded){
      this.setState({loaded: true});
      socket.emit("QueryData", {
        type: "getAllFarms",
        params: [],
        password: "aki password"
      });
    }

    socket.on("getAllFarms", data => {
      this.setState({data: data});
    })
  }

  populateProjectId = (id) => {
    const { dispatch } = this.props;
    dispatch(setActiveProject(id));

  };

  render() {
    const { data } = this.state;
    const { changeToDark, changeToLight} = this.props;

    let projects = [];
    if (data){
      data.forEach(project => {
        projects.push(<SidebarLink title={project["name"]}  route={`/projects/${+project["id"]}`} onClick={()=>this.populateProjectId(project["id"])} />)
      });
    }

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
            {projects}
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  socket: state.socket,
  project: state.project
}))(SidebarContent));
