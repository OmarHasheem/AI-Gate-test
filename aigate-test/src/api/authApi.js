import {httpCall} from "./httpCall";
import {getAuthToken} from "../hooks/auth";
import {redirect} from "react-router-dom";

export const login = async (applyData) => {
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/login',
        method: 'POST',
    };

    const response = await httpCall({requestConfig, applyData});

    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('access_token', response.data.access_token);

    return '/AI-Gate/tickets';
};

export const register = async (applyData) => {
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/register',
        method: 'POST',
    }

    await httpCall({requestConfig, applyData});

    return '/AI-Gate/tickets';
};

export const logout = async () => {
    const token = getAuthToken();
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/logout',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        },
    };

    await httpCall({requestConfig});
    localStorage.clear();
    return redirect('/login');
};
