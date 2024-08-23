import { UserInfo } from "../../types/User";
import { CLEAR_USER_INFO, SET_USER_INFO } from "../actions/actionTypes";

interface InitialUserState {
    email: null;
    requests: null;
}

const initialState: InitialUserState = {
    email: null,
    requests: null,
};

const userInfoReducer = (state = initialState, action: any): InitialUserState | UserInfo  => {
    switch(action.type){
        case SET_USER_INFO:
            return {
                ...state,
                email: action.payload.email,
                requests: action.payload.requests
            }
        case CLEAR_USER_INFO:
            return initialState
        
        default:
            return state
    }
}

export default userInfoReducer