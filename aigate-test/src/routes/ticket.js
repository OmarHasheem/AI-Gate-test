import Tickets from "../pages/ticket/Tickets";
import TicketDetail from "../pages/ticket/TicketDetail";
import {checkAuthLoader} from "../hooks/auth";
import {ticketDetail as ticketDetailLoader, tickets as ticketsLoader} from "../api/ticketApi";
import {redirect} from "react-router-dom";


export const ticketRoutes = {
    path: '/AI-Gate',
    loader: checkAuthLoader,
    children: [
        {
            index: true,
            loader: () => (redirect('/AI-Gate/tickets')),
        },
        {
            path: '/AI-Gate/tickets',
            children: [
                {
                    index: true,
                    element: <Tickets/>,
                    loader: ticketsLoader,
                },
                {
                    path: '/AI-Gate/tickets/ticket-detail',
                    id: 'ticket-detail',
                    loader: ticketDetailLoader,
                    children: [
                        {
                            path: '/AI-Gate/tickets/ticket-detail/:ticketId',
                            element: <TicketDetail/>
                        },
                    ]
                },
            ]
        },
    ]
};