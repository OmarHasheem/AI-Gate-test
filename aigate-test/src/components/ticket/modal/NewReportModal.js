import {Button, Form, Input, Modal} from "antd";
import classes from './NewReportModal.module.scss';

const NewReportModal = ({isModalVisible, closeModal, handleSave, setReportValueForTicket}) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Create New Report"
            open={isModalVisible}
            onCancel={() => closeModal()}
            footer={[
                <Button key="cancel" onClick={() => closeModal()}>
                    Cancel
                </Button>,
                <Button className={classes['button-primary']} key="save" onClick={() => {handleSave(); form.resetFields();}}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form}>
                <Form.Item
                    label="Report"
                    name="report"
                    rules={[{required: true, message: 'Please input your report!'}]}
                >
                    <Input allowClear onBlur={(event) => {
                        setReportValueForTicket(event.target.value)
                    }}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewReportModal;