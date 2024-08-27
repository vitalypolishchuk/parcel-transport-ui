import { Request } from "../../types/Request";
import { SET_REQUESTS } from "./actionTypes";

export const setRequests = (requests: Request[]) => ({
    type: SET_REQUESTS,
    payload: requests,
});