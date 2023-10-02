import PropTypes from "prop-types";

export const NullPerformer = PropTypes.shape({
    id: PropTypes.string,
});

export const Performer = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
});