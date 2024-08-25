import { Dispatch } from 'redux';
import { setUser } from '../../store/actions/userInfoActions';
import { UserInfo } from '../../types/User'; // Adjust path as necessary
import { setError } from '../../store/actions/errorActions';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUserData = (naviatge: Function, location: string) => async (dispatch: Dispatch) => {  
    try {
      const validateResponse = await fetch(`${apiUrl}/auth/validate`, {
        method: "GET",
        credentials: 'include' // Ensure cookies are sent with the request
      });

      const data: UserInfo | { error: string } = await validateResponse.json();

      if("error" in data) throw new Error(data.error);
      
      dispatch(setUser(data));
    } catch (error: any) {
      if(location !== '/signup') {
        naviatge('/signup');
        return;
      }
    };
};