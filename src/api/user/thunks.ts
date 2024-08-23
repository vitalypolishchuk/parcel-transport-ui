import { Dispatch } from 'redux';
import { setUser } from '../../store/actions/userInfoActions';
import { UserInfo } from '../../types/User'; // Adjust path as necessary
import { setError } from '../../store/actions/errorActions';

export const fetchUserData = () => async (dispatch: Dispatch) => {  
    try {
      throw new Error("my error")
      const data: UserInfo = {
        email: 'vetal.polishuk@gmail.com',
        requests: 2,
      };
      dispatch(setUser(data));
    } catch (error: any) {
      dispatch(setError({error: error.message}))
    };
};