import { DELETE_REQUEST, EDIT_REQUEST, SET_REQUESTS } from "../actions/actionTypes";
import { Request } from "../../types/Request";

type InitialRequestState = Request[];

const initialRequestState: InitialRequestState = [];

const requestReducer = (state = initialRequestState, action: any): InitialRequestState => {
    switch (action.type) {
        case SET_REQUESTS:
            return action.payload;
        case DELETE_REQUEST:
            return state.filter((request: Request) => request.id !== action.payload);
        case EDIT_REQUEST:
            return state.map((request: Request) => {
                if (request.id === action.payload.id) {
                    return { ...request, description: action.payload.description };
                }
                return request;
            });
        default:
            return state;
    }
};

export default requestReducer;