import { ACTIVATE_CONTROLLER } from "../actions/controllerActions";

let activeController = null;

export default function(state = activeController, action) {
  switch (action.type) {
    case ACTIVATE_CONTROLLER:
      activeController = action.data;
      return activeController;
    default:
      return state;
  }
}
