import TicketItem from "../../components/ticket/TicketItem";
import {useRouteLoaderData} from "react-router-dom";


const TicketDetail = () => {
    const ticket = useRouteLoaderData('ticket-detail');

    return (
        <TicketItem ticket={ticket[0]}/>
    );
};

export default TicketDetail;


