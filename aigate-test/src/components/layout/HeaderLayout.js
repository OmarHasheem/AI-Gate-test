import classes from "./HeaderLayout.module.scss";
import {Dropdown, Layout, Space} from "antd";
import {Link} from "react-router-dom";
import {useUser} from "../../context/UserContext";

const HeaderLayout = () => {
    const {Header} = Layout;
    const {userData, logout: logoutCTX} = useUser();

    const items = [
        {
            key: '1',
            label: (
                <Link to="/logout" onClick={() => (logoutCTX())}>
                    Logout
                </Link>
            ),
        },
    ];

    return (
        <Layout>
            <Header className={classes.header}>
                <div className={classes.header__logo}>
                    <span>AI Gate</span>
                </div>
                <div className={classes.header__nav}>
                    <Link to="/AI-Gate/tickets" className={classes['header__nav-item']}>Tickets</Link>
                    {!userData.id && <Link to="/login" className={classes['header__nav-item']}>Login</Link>}
                    {userData.id &&  <Space direction="vertical">
                        <Space wrap  className={classes['header__nav-item']}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <span >{userData.name}</span>
                            </Dropdown>
                        </Space>
                    </Space>
                    }
                </div>
            </Header>
        </Layout>
    );
};

export default HeaderLayout;