import PropTypes from "prop-types";
import { useState } from "react";

import { JobModal } from "components/JobModal";

import { ManagerContext } from "./context";

const initialValues = {
    isOpen: false,
    data: null,
};

export const JobModalManager = ({ children }) => {
    const [state, setState] = useState(initialValues);

    const handlerOnHide = () => {
        setState(initialValues);
    };
    const handlerOnShowModal = (data) => {
        setState({
            isOpen: true,
            data,
        });
    };

    return (
        <ManagerContext.Provider value={{ showModal: handlerOnShowModal }}>
            {children}
            {state.isOpen && <JobModal job={state.data} onHide={handlerOnHide} />}
        </ManagerContext.Provider>
    );
};

JobModalManager.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};