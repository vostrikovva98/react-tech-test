import PropTypes from "prop-types";

import { Tag } from "./Tag";
import { NullPerformer, Performer } from "./Performer";

export const Job = PropTypes.shape({
    id: PropTypes.string.isRequired,
    currentStepId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    reference: PropTypes.string,
    address: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(Tag).isRequired,
    performer: PropTypes.oneOfType([NullPerformer, Performer]).isRequired,
});