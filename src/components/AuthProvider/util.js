import { REACT_APP_API_URL, REACT_APP_LOGIN, REACT_APP_PASSWORD } from "config/envConstants";

export const getIsEnvConstantsValid = () => {
    return !!(REACT_APP_LOGIN && REACT_APP_API_URL && REACT_APP_PASSWORD);
};