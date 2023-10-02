import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { jobApi } from "services/jobApi";
import { authApi } from "services/authApi";

export const store = configureStore({
    reducer: {
        [jobApi.reducerPath]: jobApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false })
            .concat(jobApi.middleware)
            .concat(authApi.middleware)
});

setupListeners(store.dispatch);