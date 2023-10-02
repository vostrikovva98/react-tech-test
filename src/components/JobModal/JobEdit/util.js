import { UNASSIGNED_PERFORMER, UNASSIGNED_PERFORMER_ID } from "config/unassignedPerformer";

const getValueFromState = (state) => state.value;

// NOTE: created_at can't be changed!
export const prepareJobProp = ({
    jobStates,
    jobTags,
    jobPerformer,
    jobOptionalPerformers,
}) => ({
    title: getValueFromState(jobStates.jobTitle),
    reference: jobStates.jobReference? getValueFromState(jobStates.jobReference): "",
    address: jobStates.jobAddress? getValueFromState(jobStates.jobAddress): "",
    startedAt: getValueFromState(jobStates.jobStartDate),

    optionalPerformers: jobOptionalPerformers.map(({ id, userName }) => ({
        id,
        name: userName,
    })),
    performer: jobPerformer?.id? jobPerformer: UNASSIGNED_PERFORMER,
    tags: jobTags,
});

const isEqual = (a, b) => {
    if(typeof a === "string" 
    || typeof a === "number") {
        return a === b;
    }
    if(typeof a === "object" 
    && Array.isArray(a)) {
        if(a.length !== b.length) return false;

        const copyA = [...a];
        const copyB = [...b];
        copyA.sort(({ id }, { idA }) => id > idA);
        copyB.sort(({ id }, { idA }) => id > idA);

        return copyA.every(({ id }, index) => id === copyB[index].id);
    }
    if (typeof a === "object"){
        return a.id === b.id;
    }

    return false;
};

const hasObjectsDifference = (previos, current) => {
    const diffObject = {};

    Object.keys(previos).forEach((key) => {
        if(!isEqual(previos[key], current[key])) 
            diffObject[key] = true;
    });

    return diffObject;
};

export const getArraysDifference = (a, b, property = "id") => {
    return a.filter((element) => b.every((elementB) => 
        elementB[property] !== element[property]
    ));
}; 

const STATE_MAP = {
    title: "jobTitle",
    reference: "jobReference",
    address: "jobAddress",
    startedAt: "jobStartDate",
};

export const submitValues = ({ 
    id,
    previousValues,
    values,
    jobStates,
    assignJobPerformer,
    unassignJobPerformer,
    assignJobReaderPerformer,
    unassignJobReaderPerformer,
    updateJobTags,
    updateJobStates,
}) => {
    const hasDiffObject = hasObjectsDifference(previousValues, values);

    if(hasDiffObject.performer) {
        if(values.performer.id === UNASSIGNED_PERFORMER_ID) {
            unassignJobPerformer({
                jobId: id,
                performerId: previousValues.performer.id,
            });
        }
        else {
            assignJobPerformer({
                jobId: id,
                performerId: values.performer.id,
            });
        }

        delete hasDiffObject.performer;
    }
    if(hasDiffObject.optionalPerformers) {
        const removeItems = getArraysDifference(previousValues.optionalPerformers, values.optionalPerformers);
        const addItems = getArraysDifference(values.optionalPerformers, previousValues.optionalPerformers);
        
        addItems.forEach((elem) => {
            assignJobReaderPerformer({
                jobId: id,
                performerId: elem.id,
            });
        });
        removeItems.forEach((elem) => {
            unassignJobReaderPerformer({
                jobId: id,
                performerId: elem.id,
            });
        });

        delete hasDiffObject.optionalPerformers;
    }
    if(hasDiffObject.tags) {
        updateJobTags({
            jobId: id,
            tagIds: values.tags.map(({ id }) => id) || [],
        });
        delete hasDiffObject.tags;
    }

    if(Object.keys(hasDiffObject).length > 0) {
        const stepId = jobStates.id;
        const cellBody = {};
        Object.keys(values).forEach((key) => {
            if(!hasDiffObject[key]) return;
    
            cellBody[STATE_MAP[key]] = {
                value: values[key],
                version: jobStates[STATE_MAP[key]]?.version? 
                    jobStates[STATE_MAP[key]]?.version: 0,
            };
        });

        updateJobStates({
            id,
            stepId,
            cellBody,
        });
    }
};