import { ACTIVATE_COLORS } from "../actions/colorActions";

let activeColors = [];

export default function(state = activeColors, action) {
  switch (action.type) {
    case ACTIVATE_COLORS:
      activeColors = action.data;
      return activeColors;
    default:
      return state;
  }
}
