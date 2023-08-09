import {redirect} from "react-router-dom";

export function getAuthToken() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return null;
    }

    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token || token === 'EXPIRED') {
        return redirect('/login');
    }

    return null;
}