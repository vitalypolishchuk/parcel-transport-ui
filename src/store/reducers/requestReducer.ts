import { CLEAR_ERROR, SET_ERROR, SET_REQUESTS } from "../actions/actionTypes";
import { Request } from "../../types/Request";

type InitialRequestState = Request[];

const initialRequestState: InitialRequestState = [];

const requestReducer = (state = initialRequestState, action: any): InitialRequestState => {
    switch (action.type) {
        case SET_REQUESTS:
            return action.payload;
        default:
            return state;
    }
};

export default requestReducer;