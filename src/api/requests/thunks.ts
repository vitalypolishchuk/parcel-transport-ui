import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { handleLogout } from '../auth/thunks';
import { Request } from '../../types/Request';
import { setRequests } from '../../store/actions/requestActions';
import { setError } from '../../store/actions/errorActions';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchRequests = async (navigate: Function, dispatch: Function) => {
    try {
        const authToken = Cookies.get('authToken');
        if(!authToken){
            handleLogout(navigate, dispatch)
        };

        const requestsResponse = await fetch(`${apiUrl}/request/get`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        if (requestsResponse.status === 401) {
            handleLogout(navigate, dispatch); // Clear cookies and log out
            return;
        }

        const data: { requests: Request[] } | { error: string } = await requestsResponse.json();

        if("error" in data) throw new Error(data.error);
        
        dispatch(setRequests(data.requests));
    } catch (error: any) {
        dispatch(setError({error: error instanceof Error ? error.message : "Something went wrong"}))
    };
};