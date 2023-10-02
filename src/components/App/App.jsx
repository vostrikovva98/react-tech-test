import { Provider } from "react-redux";

import { AuthProvider } from "components/AuthProvider";
import { JobBoard } from "components/JobBoard";
import { JobModalManager } from "components/JobModalManager";
import { store } from "store";
import { GlobalReduxLoader } from "components/GlobalReduxLoader";

export const App = () => {
    return (
        <Provider store={store}>
            <GlobalReduxLoader>            
                <AuthProvider>
                    <JobModalManager>
                        <JobBoard />
                    </JobModalManager>
                </AuthProvider>
            </GlobalReduxLoader>
        </Provider>
    );
};