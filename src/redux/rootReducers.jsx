import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import messageReducer from "./reducers/messageReducer";
import contactListReducer from "./reducers/contactListReducer";
import profileReducer from "./reducers/profileReducer";

const rootReducer = combineReducers({
  AUTH: authReducer,
  MESSAGE: messageReducer,
  CONTACT_LIST: contactListReducer,
  PROFILE: profileReducer,
});

export default rootReducer;
