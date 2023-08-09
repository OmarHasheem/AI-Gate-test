import {Outlet} from "react-router-dom";
import {Fragment, useEffect} from "react";
import HeaderLayout from "../components/layout/HeaderLayout";
import {Layout} from "antd";
import {useUser} from "../context/UserContext";
import {getAuthToken} from "../hooks/auth";

const RootPage = () => {
    const {Content} = Layout;
    const {login, logout} = useUser();
    const token = getAuthToken();

    useEffect(() => {
        if (token)
            login();
        else
            logout();
    }, [token]);

    return (
        <Fragment>
            <HeaderLayout/>
            <Layout>
                <Content style={{backgroundColor: 'white'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Fragment>
    );
};

export default RootPage;