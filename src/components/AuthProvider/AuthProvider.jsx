import PropTypes from "prop-types";
import { useState, useEffect } from "react";


import { useLoginMutation } from "services/authApi";
import { getJWTTokenFromLocalStorage, setJWTTokenInLocalStorage } from "helpers/localStorage";
import { REACT_APP_LOGIN, REACT_APP_PASSWORD } from "config/envConstants";

import { getIsEnvConstantsValid } from "./util";

export const AuthProvider = ({ children }) => {
    const [isEnvError, setIsEnvError] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!getJWTTokenFromLocalStorage());
    const [login, { isSuccess, data }] = useLoginMutation();

    if(isEnvError) throw new Error(".env not found or incorrectly described");

    useEffect(() => {
        if(isAuthenticated) return;

        const isEnvValid = getIsEnvConstantsValid();     
        if(isEnvValid) {
            const body = new FormData();

            body.append("user[login]", REACT_APP_LOGIN);
            body.append("user[password]", REACT_APP_PASSWORD);
    
            login(body);
        }
        else setIsEnvError(true);
    }, [isAuthenticated]);
    useEffect(() => {
        if(isSuccess && data) {
            setJWTTokenInLocalStorage(data.token);
            setIsAuthenticated(true);
        }
    }, [isSuccess]);

    return isAuthenticated? <>{children}</>: <></>;
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};