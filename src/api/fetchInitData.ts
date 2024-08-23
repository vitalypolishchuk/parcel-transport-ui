import { Dispatch } from "redux";
import { fetchUserData } from "./user/thunks";

export const fetchInitialData = async (dispatch: Dispatch) => {
    try {
      // Fetch user data
      await dispatch(fetchUserData() as any);
      // Add additional fetch calls as needed
    } catch (error: any) {
    }
};