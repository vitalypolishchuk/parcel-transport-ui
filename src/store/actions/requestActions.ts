import { Request } from "../../types/Request";
import { DELETE_REQUEST, EDIT_REQUEST, SET_REQUESTS } from "./actionTypes";

export const setRequests = (requests: Request[]) => ({
    type: SET_REQUESTS,
    payload: requests,
});

export const deleteRequest = (id: string) => ({
    type: DELETE_REQUEST,
    payload: id,
});

export const editRequest = (id: string, description: string) => ({
    type: EDIT_REQUEST,
    payload: { id, description },
});