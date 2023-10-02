import { createApi } from "@reduxjs/toolkit/query/react";

import { REACT_APP_API_URL } from "config/envConstants";
import { axiosBaseQuery } from "helpers/axiosBaseQuery";


export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: axiosBaseQuery({ baseUrl: REACT_APP_API_URL }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: "/login.json",
                method: "POST",
                body: body,
            }),
            transformResponse: (response) => response.data,
        })
    })
});

export const { useLoginMutation } = authApi;
