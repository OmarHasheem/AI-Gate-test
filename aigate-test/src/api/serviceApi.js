import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getAuthToken} from "../hooks/auth";
import {httpCall} from "./httpCall";

export const useGetServices = () => {
    const [services, setServices] = useState([]);
    const servicesList = async () => {
        const token = getAuthToken();

        const requestConfig = {
            method: 'GET',
            url: 'https://assignments.aigate.me/backend_technical_test/public/api/view-services',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
        };

        const response = await httpCall({requestConfig});

        return response;
    };

    const {data} = useQuery('servicesList', servicesList);

    useEffect(()=>{
        if (data)
            setServices(data.data[0])
    }, [data]);

    return services;
}
