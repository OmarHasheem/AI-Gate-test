import TicketsList from "../../components/ticket/TicketsList";
import {useEffect, useState} from "react";
import {useGetServices} from "../../api/serviceApi";
import {useLoaderData} from "react-router-dom";


const Tickets = () => {
    const tickets = useLoaderData();
    const [services, setServices] = useState([]);
    const servicesResponse = useGetServices();

    useEffect(() => {
        setServices(servicesResponse);
    }, [servicesResponse]);


    return (
        <TicketsList tickets={tickets.data} services={services}/>
    );
};

export default Tickets;

