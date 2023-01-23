import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
    authentication : authReducer
});

module.exports = rootReducer;