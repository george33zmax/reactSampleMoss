import { combineReducers, createStore } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import {
  sidebarReducer,
  themeReducer,
  socketReducer,
  userInfoReducer,
  activeProjectReducer,
  controllerReducer,
  colorReducer
} from "../../redux/reducers/index";

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  socket: socketReducer,
  user: userInfoReducer,
  project: activeProjectReducer,
  controllerData: controllerReducer,
  colorData: colorReducer
});

const store = createStore(reducer);

export default store;
