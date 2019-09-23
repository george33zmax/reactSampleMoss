import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setActiveProject} from "../../../redux/actions/projectActions";
import {setActiveController} from "../../../redux/actions/controllerActions";

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    allProjects: null,
    controllerData: null,
    loaded: false,
    phases: [],
    steps: null,
    activePhase: "Overall",
    activeStep: "Overall"
  };

  async componentDidMount(){
    const {socket, project, dispatch} = this.props;
    const {loaded} = this.state;

    const currentProject = localStorage.getItem("currentProject");
    console.log("currentProject", currentProject);
    if (!project && currentProject){
      this.populateProjectId(currentProject);
    }

    if (!loaded){
      this.setState({loaded: true});
      socket.emit("QueryData", {
        type: "getAllFarms",
        params: [],
        password: "aki password"
      });
      socket.emit("QueryData", {
        type: "getPhases",
        params: [],
        password: "aki password"
      });
    }

    socket.on("getAllFarms", data => {
      this.setState({allProjects: data});
    });
    socket.on("getPhases", data => {
      let phases = [];
      data.forEach((option) => {
        phases.push(option["name"]);
      });
      phases.unshift("Overall");
      // phases.push("Refusal");
      this.setState({phases: phases});
    });
    socket.on("getSteps", data => {
      const phase = {
        "Overall": [],
        "Mechanical": [],
        "Table Electrical": [],
        "Electrical Array": []
      };
      console.log("data Steps", data)
      data.forEach(ele => {
        if(phase[ele["phase"]]){
          const firstW = ele["component_type"] ? ele["component_type"] : ele["description"];
          const step = `${firstW} ${ele["step"]}`;
          phase[ele["phase"]].push(step);
          phase["Overall"].push(step);
        }
      });
      this.setState({steps: phase});
      // console.log("total steps overall", phase["Overall"].length)
    });
    socket.on("getController", data => {
      dispatch(setActiveController(data));
      this.setState({controllerData: data});
    });
  }

  loadProjectSteps = (socket, currentProject) => {
    socket.emit("QueryData", {
      type: "getSteps",
      params: [currentProject],
      password: "aki password"
    });
  };

  populateProjectId = (id) => {
    const { dispatch, socket } = this.props;
    dispatch(setActiveProject(id));
    this.getControllerData(id);
    localStorage.setItem("currentProject", id);
    this.loadProjectSteps(socket,id)
  };

  getControllerData = (projectID) => {
    const {socket} = this.props;
    socket.emit("QueryData", {
      type: "getController",
      params: [projectID],
      password: "aki password"
    });
  };

  render() {
    const { allProjects, phases, steps, activePhase, activeStep } = this.state;
    const { changeToDark, changeToLight} = this.props;

    let projects = [];
    if (allProjects){
      allProjects.forEach(project => {
        projects.push(<SidebarLink title={project["name"]}  route={`/projects/${+project["id"]}`} onClick={()=>this.populateProjectId(project["id"])} />)
      });
    }

    let phasesDisplay = [];
    // console.log("phases", phases);
    if (phases){
      phases.forEach(phase => {
        phasesDisplay.push(<SidebarLink title={phase} onClick={(e)=>{
            e.preventDefault();
            this.setState({activePhase: phase});
          }
        }/>)
      });
    }

    let stepsNormalized = [];
    // console.log("steps", steps);
    if(steps && steps[activePhase]){
      steps[activePhase].forEach(step => {
        stepsNormalized.push(<SidebarLink title={step} onClick={(e)=>{
          e.preventDefault();
          this.setState({activeStep: step});
        }}/>);
      });
    }else stepsNormalized.push(<SidebarLink title={"Select a Project"}/>);

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
          <SidebarCategory title={`Phase | ${activePhase}`} icon="cog">
            {phasesDisplay}
          </SidebarCategory>
          <SidebarCategory title={`Step | ${activeStep}`} icon="sort-amount-asc">
            {stepsNormalized}
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  socket: state.socket,
  project: state.project,
}))(SidebarContent));
