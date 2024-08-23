import { UserInfo } from "../../types/User";
import { CLEAR_USER_INFO, SET_USER_INFO } from "./actionTypes";

export const setUser = (userInfo: UserInfo) => ({
    type: SET_USER_INFO,
    payload: userInfo,
});
  
export const clearUser = () => ({
    type: CLEAR_USER_INFO,
});