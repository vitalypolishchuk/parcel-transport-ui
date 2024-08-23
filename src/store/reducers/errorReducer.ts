import { Error } from "../../types/Common";
import { CLEAR_ERROR, SET_ERROR } from "../actions/actionTypes";
import { v4 as uuidv4 } from 'uuid';

interface InitialErrorState {
    errors: Error[];
}

const initialErrorState: InitialErrorState = {
    errors: [],
};

const errorReducer = (state = initialErrorState, action: any): InitialErrorState => {
    switch (action.type) {
        case SET_ERROR:
            const payload = {
                ...action.payload,
                id: uuidv4()
            }
            return {
                ...state, errors: [...state.errors, payload]
            };
        case CLEAR_ERROR:
            console.log(action.payload.id, state.errors);
            return {
                ...state,
                errors: state.errors.filter((error: Error) => error.id !== action.payload.id)
            }
        default:
            return state;
    }
};

export default errorReducer;