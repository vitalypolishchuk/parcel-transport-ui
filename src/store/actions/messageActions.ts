import { Message } from "../../types/Common";
import { CLEAR_MESSAGE, SET_MESSAGE } from "./actionTypes";

export const setMessage = (message: Message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const clearMessage = (id: string) => ({
    type: CLEAR_MESSAGE,
    payload: { id }
});