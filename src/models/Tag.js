import PropTypes from "prop-types";

export const Tag = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}).isRequired;