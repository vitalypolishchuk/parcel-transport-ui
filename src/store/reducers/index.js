import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import requestReducer from "./requestReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    messages: messageReducer,
    requests: requestReducer
})

export default rootReducer;