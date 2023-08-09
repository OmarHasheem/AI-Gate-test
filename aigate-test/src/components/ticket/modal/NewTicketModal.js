import {Button, Form, Modal, Select} from "antd";
import classes from "./NewTicketModal.module.scss";

const NewTicketModal = ({isModalVisible, closeModal, handleSave, services, setServiceOfNewTicketValue}) => {
    const {Option} = Select;
    return (
        <Modal
            title="Create New Ticket"
            open={isModalVisible}
            onCancel={() => closeModal()}
            footer={[
                <Button key="cancel" onClick={() => closeModal()}>
                    Cancel
                </Button>,
                <Button className={classes['button-primary']} key="save" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form>
                <Form.Item
                    label="Select Service"
                    name="service"
                    rules={[{required: true, message: 'Please Select service!'}]}
                >
                    <Select placeholder="Select service to ticket"
                            onChange={(event) => (setServiceOfNewTicketValue(event))}>
                        {services.map((service) => (<Option key={service.id}
                                                            value={service.id}>{service.title} ({service.price}$)</Option>))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default NewTicketModal;