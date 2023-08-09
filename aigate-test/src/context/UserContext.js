import {createContext, useContext, useState} from "react";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    const login = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);
    };

    const logout = () => {
        setUserData({});
    }
    return (
        <UserContext.Provider value={{login, logout, userData}}>
            {children}
        </UserContext.Provider>
    );
};