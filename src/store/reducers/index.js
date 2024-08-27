import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userInfoReducer from "./userInfoReducer";
import requestReducer from "./requestReducer";

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    error: errorReducer,
    requests: requestReducer
})

export default rootReducer;