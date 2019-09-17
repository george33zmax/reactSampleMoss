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
    phases: [],
    steps: null,
    activePhase: "Overall",
    activeStep: "Overall"
  };

  async componentDidMount(){
    const {socket} = this.props;
    const {loaded} = this.state;
    const currentProject = localStorage.getItem("currentProject");
    this.setState({project: currentProject});
    this.populateProjectId(currentProject);

    if (!loaded){
      this.setState({loaded: true});
      socket.emit("QueryData", {
        type: "getAllFarms",
        params: [],
        password: "aki password"
      });

      this.loadProjectData(socket, currentProject);
    }

    socket.on("getPhases", data => {
      let phases = [];
      data.forEach((option) => {
        phases.push(option["name"]);
      });
      // phases.unshift("Overall");
      // phases.push("Refusal");
      this.setState({phases: phases});
    });
    socket.on("getAllFarms", data => {
      this.setState({data: data});
    });
    socket.on("getSteps", data => {
      const phase = {
        "Overall": ["Select a Phase"],
        "Mechanical": [],
        "Table Electrical": [],
        "Electrical Array": []
      };
      data.forEach(ele => {
        if(phase[ele["phase"]]){
          const step = `${ele["component_type"]} ${ele["step"]}`;
          phase[ele["phase"]].push(step)
        }
      });
      this.setState({steps: phase});
    });
  }

  loadProjectData = (socket, currentProject) => {
    socket.emit("QueryData", {
      type: "getPhases",
      params: [],
      password: "aki password"
    });
    socket.emit("QueryData", {
      type: "getSteps",
      params: [currentProject],
      password: "aki password"
    });
  };

  populateProjectId = (id) => {
    const { dispatch, socket } = this.props;
    dispatch(setActiveProject(id));
    localStorage.setItem("currentProject", id);
    this.loadProjectData(socket,id)
  };

  handlePhase = (e, phase) => {
    e.preventDefault();
    this.setState({activePhase: phase})
  };

  render() {
    const { data, phases, steps, activePhase, activeStep } = this.state;
    const { changeToDark, changeToLight, project} = this.props;

    let projects = [];
    if (data){
      data.forEach(project => {
        projects.push(<SidebarLink title={project["name"]}  route={`/projects/${+project["id"]}`} onClick={()=>this.populateProjectId(project["id"])} />)
      });
    }

    let phasesDisplay = [];
    if (phases){
      if (project){
        phases.forEach(phase => {
          phasesDisplay.push(<SidebarLink title={phase} onClick={(e)=>this.handlePhase(e, phase)}/>)
        });
      }else {
        phasesDisplay.push(<SidebarLink title={"Select a Project"} />)
      }
    }

    let stepsNormalized = [];
    if(steps && steps[activePhase]){
      steps[activePhase].forEach(step => {
        stepsNormalized.push(<SidebarLink title={step} onClick={(e)=>{
          e.preventDefault();
          this.setState({activeStep: step});
        }}/>);
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
  project: state.project
}))(SidebarContent));
