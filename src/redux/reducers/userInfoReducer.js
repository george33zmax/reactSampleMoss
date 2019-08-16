import { SAVE_USER_INFO } from "../actions/userActions";

let initialUser = false;

export default function(state = initialUser, action) {
  switch (action.type) {
    case SAVE_USER_INFO:
      initialUser = action.data;
      return initialUser;
    default:
      return state;
  }
}
