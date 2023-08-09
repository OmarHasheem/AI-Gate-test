import {Button, Form, Input} from "antd";
import {login} from "../api/authApi";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../context/UserContext";
import classes from "./LoginForm.module.scss";

const LoginForm = () => {
    const navigate = useNavigate();
    const {login: loginCTX} = useUser();
    const onFinishHandler = async (values) => {
        const {email, password} = values;

        const data = {
            email: email,
            password: password,
        };

        const newLocation = await login(data);
        navigate(newLocation);
        loginCTX();
    };

    return (
        <Form onFinish={onFinishHandler} method="post" className={classes.loginForm}>
            <Form.Item
                label="email"
                name="email"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button className={classes['button-primary']} htmlType="submit">
                    <span>Login</span>
                </Button>
            </Form.Item>
            <Form.Item>
                <div className={classes['link-primary']}>
                <Link to="/register">
                    <span>Create New Account?</span>
                </Link>
                </div>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;