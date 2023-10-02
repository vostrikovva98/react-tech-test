import { UNASSIGNED_PERFORMER } from "config/unassignedPerformer";

export const actionTypes = {
    TITLE: "title",
    REFERENCE: "reference",
    ADDRESS: "address",
    START_DATE: "startedAt",
    TAGS: "tags",
    PERFORMER: "performer",
    OPTIONAL_PERFORMERS: "optionalPerformers",
};

export const reducer = (prevState, action) => {
    const state = { ...prevState };

    switch (action.type) {
    case actionTypes.TITLE:
    case actionTypes.REFERENCE:
    case actionTypes.ADDRESS:
    case actionTypes.START_DATE:
    case actionTypes.TAGS:
    case actionTypes.OPTIONAL_PERFORMERS:
        state[action.type] = action.payload;    
        break;
    case actionTypes.PERFORMER:
        state[action.type] = action.payload?.length === 1? action.payload[0]: UNASSIGNED_PERFORMER;
        break;
    default:
        break;
    }

    return state;
};