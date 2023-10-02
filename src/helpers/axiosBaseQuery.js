import { clearJWTTokenInLocalStorage } from "helpers/localStorage";
import request from "helpers/request";

export const axiosBaseQuery = ({ baseUrl }) => 
    async ({ url, method, body: data, params }) => {
        try {
            const result = await request({ url: `${baseUrl}${url}`, method, data, params });
            return { data: result };
        } catch (axiosError) {
            const err = axiosError;

            if(err.response.status === 401) {
                clearJWTTokenInLocalStorage();
                window.location.reload();
            }

            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };