import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  AUTH: authReducer,
});

export default rootReducer;
