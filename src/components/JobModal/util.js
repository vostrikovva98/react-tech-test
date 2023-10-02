import { UNASSIGNED_PERFORMER_ID } from "config/unassignedPerformer";

export const prepareDataForJobEdit = ({ 
    currentJob, 
    optionalPerformers, 
    jobState, 
}) => {
    return {
        jobStates: jobState || {},
        tags: currentJob.tags || [],
        performer: currentJob.performer || {
            name: "-",
            id: UNASSIGNED_PERFORMER_ID,
        },
        optionalPerformers: optionalPerformers || [],
    };
};