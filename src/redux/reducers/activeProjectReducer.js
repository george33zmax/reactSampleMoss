import { ACTIVATE_PROJECT } from "../actions/projectActions";

let activeProject = null;

export default function(state = activeProject, action) {
  switch (action.type) {
    case ACTIVATE_PROJECT:
      activeProject = action.data;
      return activeProject;
    default:
      return state;
  }
}
