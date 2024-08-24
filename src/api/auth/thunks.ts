import axios from 'axios';
import { Dispatch } from 'redux';
import { setUser } from '../../store/actions/userInfoActions';
import { setError } from '../../store/actions/errorActions';
import { UserInfo } from '../../types/User';
import Cookies from 'js-cookie';

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
    Cookies.set('authToken', data.token, { expires: 1 }); // Token expires in 1 day, adjust as needed

    // Fetch user data with token
    const userDataResponse = await fetch(`${apiUrl}/auth/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` }
    });
    const userData = await userDataResponse.json();
    console.log({userData})

    // Update user info in Redux store
    dispatch(setUser(userData));
  } catch (error: any) {
    dispatch(setError({ error: error.message }));
  }
};