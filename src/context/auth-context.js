import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = props => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            let status = await verifyToken();
            setLoggedIn(status);
        })();
    }, [])

    const verifyToken = async () => {

        let user = getCurrentUser();
        if (!user) {
            return false;
        }
        let token = user.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let result = await axios.get(`${process.env.REACT_APP_API_HOST}/verifyToken`, config).catch((e) => {
            return false;
        });
        return result.data.success == 0 ? false : true;


    }

    const login = () => {
        setLoggedIn(true);
        
        navigate("/dashboard");
    }

    const logout = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
        navigate("/");
    }

    const getCurrentUser = () => {
        let user = localStorage.getItem('user')
        if(!user){
            return({
                data:{
                    user_name:""
                }
            });
        }
        return JSON.parse(user);

    }

    const authContextValue = {
        login,
        loggedIn,
        logout,
        getCurrentUser
    };

    return <AuthContext.Provider value={authContextValue} {...props} />
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth }
