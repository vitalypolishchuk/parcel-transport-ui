import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { handleLogout } from '../auth/thunks';
import { Request } from '../../types/Request';
import { setRequests } from '../../store/actions/requestActions';
import { deleteRequest as deleteRequestAction, editRequest as editRequestAction } from '../../store/actions/requestActions';
import { setMessage } from '../../store/actions/messageActions';

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
        const err = error instanceof Error ? error.message : "Something went wrong"
        dispatch(setMessage({ text: err, severity: 'error' }));
    };
};

export const deleteRequest = async (id: string, navigate: Function, dispatch: Function) => {
    try {
        const authToken = Cookies.get('authToken');
        if(!authToken){
            handleLogout(navigate, dispatch)
        };

        const requestsResponse = await fetch(`${apiUrl}/request/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({ id })
        });

        if (requestsResponse.status === 401) {
            handleLogout(navigate, dispatch); // Clear cookies and log out
            return;
        }

        const data: { id: string } | { error: string } = await requestsResponse.json();

        if("error" in data) throw new Error(data.error);
        
        dispatch(deleteRequestAction(data.id));
    } catch (error: any) {
        const err = error instanceof Error ? error.message : "Something went wrong"
        dispatch(setMessage({ text: err, severity: 'error' }));
    };
};

export const editRequest = async (id: string, description: string, navigate: Function, dispatch: Function) => {
    try {
        const authToken = Cookies.get('authToken');
        if(!authToken){
            handleLogout(navigate, dispatch)
        };

        const requestsResponse = await fetch(`${apiUrl}/request/edit`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({ id, description })
        });

        if (requestsResponse.status === 401) {
            handleLogout(navigate, dispatch); // Clear cookies and log out
            return;
        }

        const data: { id: string, description: string } | { error: string } = await requestsResponse.json();

        if("error" in data) throw new Error(data.error);
        
        dispatch(editRequestAction(data.id, data.description));
    } catch (error: any) {
        const err = error instanceof Error ? error.message : "Something went wrong"
        dispatch(setMessage({ text: err, severity: 'error' }));
    };
};