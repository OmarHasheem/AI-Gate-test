import {Button, Table} from "antd";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createNewReport} from "../../api/ticketApi";
import NewReportModal from "./modal/NewReportModal";
import classes from './TicketItem.module.scss';

const TicketItem = ({ticket}) => {
    const [isModalVisible, setIsModalVisible] = useState(false); // state of modal for create new report
    const [reportValueForTicket, setReportValueForTicket] = useState(""); // Value of report for ticket

    const {ticketId} = useParams('ticketId');
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Report Id',
            dataIndex: 'id',
            key: 'reportId',
        },
        {
            title: 'Ticket Id',
            dataIndex: 'ticket_id',
            key: 'ticketId',
        },
        {
            title: 'Report',
            dataIndex: 'report',
            key: 'report',
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };
    const handleSave = async () => {
        const data = {
            ticket_id: ticketId,
            report: reportValueForTicket,
        };
        await createNewReport(data);
        navigate('#');
        setIsModalVisible(false);
    };
    return (
        <div>
            <Button className={classes['button-primary']} onClick={showModal}>Create New Report </Button>
            <Table rowKey={record => record.id} columns={columns} dataSource={ticket.reports}></Table>
            <NewReportModal closeModal={closeModal} isModalVisible={isModalVisible} handleSave={handleSave}
                            setReportValueForTicket={setReportValueForTicket}/>
        </div>
    );
};

export default TicketItem;