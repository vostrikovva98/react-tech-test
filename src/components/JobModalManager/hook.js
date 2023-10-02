import { useContext } from "react";

import { ManagerContext } from "./context";

export const useManagerModal = () => {
    return useContext(ManagerContext);
};