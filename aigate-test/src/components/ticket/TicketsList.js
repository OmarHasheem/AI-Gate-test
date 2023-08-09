import {Button, Input, Space, Table} from "antd";
import {useRef, useState} from "react";
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {useNavigate} from "react-router-dom";
import {createNewTicket, deleteTicket} from "../../api/ticketApi";
import NewTicketModal from "./modal/NewTicketModal";
import {useUser} from "../../context/UserContext";
import classes from './TicketsList.module.scss';

const TicketsList = ({tickets, services}) => {
    const [isModalVisible, setIsModalVisible] = useState(false); // state of modal for create new ticket
    const [serviceOfNewTicketValue, setServiceOfNewTicketValue] = useState(""); // Value of service that chosen to create ticket
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const navigate = useNavigate();
    const {userData} = useUser();


    const deleteTicketHandler = async (id) => {
        await deleteTicket(id);
        navigate('#');
    };

    // Filter Search
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    // End Filter Search

    const columns = [
        {
            title: 'Ticket Id',
            dataIndex: 'id',
            key: 'ticketId',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Service Name',
            dataIndex: 'serviceTitle',
            key: 'serviceTittle',
        },
        {
            title: 'Service Price',
            dataIndex: 'servicePrice',
            key: 'servicePrice',
        },
        {
            title: 'Status',
            dataIndex: 'statusTitle',
            key: 'statusTitle',
            filters: [{text: 'Pending', value: 'pending'}, {text: 'Finished', value: 'finished'}],
            onFilter: (value, record) => record.statusTitle === value,
        },
    ];

    if (userData.role_id === 1) {
         columns.push({
            title: 'Delete Ticket',
            key: 'deleteTicket',
            render: (text, record) => (
                <Button danger key="delete_ticket" type="primary" onClick={(event) => {
                    event.stopPropagation();
                    deleteTicketHandler(record.id);
                }}>
                    Delete Ticket
                </Button>
            ),
        },);
    }

    const nestedData = tickets.map((ticket) => ({
        id: ticket.id,
        clientName: ticket.client.name,
        serviceTitle: ticket.service.title,
        servicePrice: ticket.service.price,
        statusTitle: ticket.status.title,
    }));

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };
    const handleSave = async () => {
        const data = {
            service_id: serviceOfNewTicketValue,
        };
        await createNewTicket(data);
        navigate('#');
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button className={classes['button-primary']} onClick={showModal}>Create New Ticket </Button>
            <Table columns={columns} dataSource={nestedData} rowKey={record => record.id} onRow={(record) => {
                return {
                    onClick: () => {

                        navigate('/AI-Gate/tickets/ticket-detail/' + record.id);
                    },
                    style: {cursor: 'pointer'},
                };
            }}>

            </Table>

            <NewTicketModal isModalVisible={isModalVisible} closeModal={closeModal}
                            setServiceOfNewTicketValue={setServiceOfNewTicketValue} services={services}
                            handleSave={handleSave}/>
        </div>
    );
};

export default TicketsList;