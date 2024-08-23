import { Error } from "../../types/Common";
import { CLEAR_ERROR, SET_ERROR } from "./actionTypes";

export const setError = (error: Error) => ({
    type: SET_ERROR,
    payload: error,
});

export const clearError = (id: string) => ({
    type: CLEAR_ERROR,
    payload: { id }
});