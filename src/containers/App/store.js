import { combineReducers, createStore } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import {
  sidebarReducer,
  themeReducer,
  socketReducer,
  userInfoReducer,
  activeProjectReducer,
  controllerReducer
} from "../../redux/reducers/index";

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  socket: socketReducer,
  user: userInfoReducer,
  project: activeProjectReducer,
  controllerData: controllerReducer
});

const store = createStore(reducer);

export default store;
