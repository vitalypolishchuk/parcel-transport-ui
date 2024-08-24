import { Dispatch } from "redux";
import { fetchUserData } from "./user/thunks";

export const fetchInitialData = async (dispatch: Dispatch, naviatge: Function, location: string) => {
    try {
      // Fetch user data
      await dispatch(fetchUserData(naviatge, location) as any);
      // Add additional fetch calls as needed
    } catch (error: any) {
    }
};