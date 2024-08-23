import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userInfoReducer from "./userInfoReducer";

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    error: errorReducer
})

export default rootReducer;