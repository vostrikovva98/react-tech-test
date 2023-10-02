import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import { selectIsAnythingLoading } from "store/selectors";

import styles from "./GlobalReduxLoader.module.css";

export const GlobalReduxLoader = ({ children }) => {
    const isAnythingLoading = useSelector(selectIsAnythingLoading);

    return (
        <>
            {children}
            {isAnythingLoading && (
                <>
                    <div className={styles.root}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    <div className={styles.background} />
                </>
            )}
        </>
    );
};

GlobalReduxLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};