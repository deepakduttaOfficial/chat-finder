import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";
export default createStore(rootReducer, applyMiddleware(thunk));
