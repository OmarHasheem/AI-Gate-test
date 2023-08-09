import {Button, Form, Input, Select} from "antd";
import {register} from "../api/authApi";
import {Link, useNavigate} from "react-router-dom";
import classes from './RegisterForm.module.scss';

const RegisterForm = () => {
    const {Option} = Select;
    const navigate = useNavigate();
    const onFinishHandler = async (values) => {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
            role_id: values.role,
        };
         const newLocation = await register(data);
         navigate(newLocation);
    };

    return (
        <Form onFinish={onFinishHandler} method="post" className={classes.registerForm}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Select Role"
                name="role"
                rules={[{ required: true, message: 'Please Select your role!' }]}
            >
                <Select placeholder="Select your role">
                    <Option value="1">Admin</Option>
                    <Option value="2">Client</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button className={classes.registerForm__button} htmlType="submit">
                   <span> Register </span>
                </Button>
            </Form.Item>
            <Form.Item>
                <div className={classes['link-primary']}>
                    <Link to="/register">
                        <span>Login instead?</span>
                    </Link>
                </div>
            </Form.Item>
        </Form>
    );
};


export default RegisterForm;

