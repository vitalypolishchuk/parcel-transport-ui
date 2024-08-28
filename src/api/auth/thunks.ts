import axios from 'axios';
import { Dispatch } from 'redux';
import { setUser } from '../../store/actions/userInfoActions';
import { UserInfo } from '../../types/User';
import Cookies from 'js-cookie';
import { setMessage } from '../../store/actions/messageActions';

const apiUrl = process.env.REACT_APP_API_URL;

export const handleLogin = async (email: string, password: string, dispatch: Dispatch) => {
  try {
    // Perform login request
    console.log('handle login', email, password);
    const loginResponse = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await loginResponse.json();
    console.log('login data', data);

    if('error' in data) throw new Error(data.error)

    // Save token to cookie
    Cookies.set('authToken', data.token, { expires: 1/24 }); // Token expires in 1 hour

    // Fetch user data with token
    const userDataResponse = await fetch(`${apiUrl}/user/getUser`, {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` }
    });
    const userData = await userDataResponse.json();
    console.log({userData})

    // Update user info in Redux store
    dispatch(setUser(userData));

    return { userData }
  } catch (error: any) {
    const err = error instanceof Error ? error.message : "Something went wrong"
    dispatch(setMessage({ text: err, severity: 'error' }));
    return { error: err }
  }
};

export const handleLogout = (navigate: Function, dispatch: Function) => {
  try {
      // Clear the cookie
      Cookies.remove('authToken');
      
      // Clear the Redux store
      dispatch(setUser({ email: '', requests: 0 }));
      
      // Redirect to the sign-in page
      navigate('/signin');
  } catch (error: any) {
    const err = error instanceof Error ? error.message : "Something went wrong"
    dispatch(setMessage({ text: err, severity: 'error' }));
  }
};