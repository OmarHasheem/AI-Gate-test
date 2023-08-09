import {getAuthToken} from "../hooks/auth";
import {httpCall} from "./httpCall";

export const tickets = async () => {
    const token = getAuthToken();
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/get-tickets',
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
        },
    }

    const response = await httpCall({requestConfig});

    return response.data;
};

export const  ticketDetail = async ({params}) => {
    const token = getAuthToken();
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/view-ticket/' + params.ticketId,
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
        },
    }

    const response = await httpCall({requestConfig});

    return response.data;
};

export const createNewReport = async (applyData) => {
    const token = getAuthToken();
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/add-report',
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
        },
    }

    await httpCall({requestConfig, applyData});
};

export const createNewTicket = async (applyData) => {
    const token = getAuthToken();
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/create-ticket',
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
        },
    }

    await httpCall({requestConfig, applyData});
};

export const deleteTicket = async (data) => {
    const token = getAuthToken();
    const requestConfig = {
        url: 'https://assignments.aigate.me/backend_technical_test/public/api/delete-ticket/' + data,
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
        },
    }

    await httpCall({requestConfig});
};