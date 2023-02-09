import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import messageReducer from "./reducers/messageReducer";
import contactListReducer from "./reducers/contactListReducer";

const rootReducer = combineReducers({
  AUTH: authReducer,
  MESSAGE: messageReducer,
  CONTACT_LIST: contactListReducer,
});

export default rootReducer;
