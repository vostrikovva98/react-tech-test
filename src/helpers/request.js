import camelcaseKeys from "camelcase-keys";
import axios from "axios";

import { getJWTTokenFromLocalStorage } from "./localStorage";

const request = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    }
});

function responseMapper(response) {
    return camelcaseKeys(response, { deep: true});
}

/**
 * Request interceptor for mapping the response to camelCase
 */
request.interceptors.response.use(responseMapper);

/**
 * Request interceptor for setting JWT to request header
 */
request.interceptors.request.use((config) => {
    const newConfig = config;

    const token = getJWTTokenFromLocalStorage();
    if(token) newConfig.headers.Authorization = token;

    return newConfig;
});

export default request;
