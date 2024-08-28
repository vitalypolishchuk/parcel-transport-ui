import { Message } from "../../types/Common";
import { CLEAR_MESSAGE, SET_MESSAGE } from "../actions/actionTypes";
import { v4 as uuidv4 } from 'uuid';

type InitialMessageState = Message[]

const initialMessageState: InitialMessageState = []

const messageReducer = (state = initialMessageState, action: any): InitialMessageState => {
    switch (action.type) {
        case SET_MESSAGE:
            const payload = {
                ...action.payload,
                id: uuidv4()
            }
            return [...state, payload]
        case CLEAR_MESSAGE:
            return state.filter((message: Message) => message.id !== action.payload.id)
        default:
            return state;
    }
};

export default messageReducer;