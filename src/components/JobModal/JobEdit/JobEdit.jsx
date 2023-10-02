import PropTypes from "prop-types";

import { 
    useAssignPerformerMutation, 
    useAssignReaderPerformerMutation, 
    useGetPerformersQuery, 
    useGetTagsQuery, 
    useUnassignPerformerMutation, 
    useUnassignReaderPerformerMutation, 
    useUpdateJobMutation, 
    useUpdateJobTagsMutation
} from "services/jobApi";

import { JobForm } from "./JobForm";
import { prepareJobProp, submitValues } from "./util";


export const JobEdit = ({
    jobStates,
    tags: jobTags,
    performer: jobPerformer,
    optionalPerformers: jobOptionalPerformers,
    onHide,
    id,
}) => {
    const { data: performers } = useGetPerformersQuery();
    const { data: tags } = useGetTagsQuery();
    
    const [assignJobPerformer] = useAssignPerformerMutation();
    const [unassignJobPerformer] = useUnassignPerformerMutation();
    const [assignJobReaderPerformer] = useAssignReaderPerformerMutation();
    const [unassignJobReaderPerformer] = useUnassignReaderPerformerMutation();
    const [updateJobTags] = useUpdateJobTagsMutation();
    const [updateJobStates] = useUpdateJobMutation();

    const previousValues = prepareJobProp({
        jobStates,
        jobTags,
        jobPerformer,
        jobOptionalPerformers,
    });

    const handlerOnSubmit = (values) => {
        submitValues({
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
        });
        onHide();
    };

    return (
        <JobForm 
            onSubmit={handlerOnSubmit}
            job={previousValues}
            performers={performers || []}
            tags={tags || []}
        />
    );
};

const PropertyState = PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    version: PropTypes.number,
}); 

JobEdit.propTypes = {
    id: PropTypes.string.isRequired,
    jobStates: PropTypes.shape({
        id: PropTypes.string.isRequired,
        jobTitle: PropertyState.isRequired,
        jobReference: PropertyState,
        jobStartDate: PropertyState.isRequired,
        jobAddress: PropertyState,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
    performer: PropTypes.shape({ 
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    optionalPerformers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
    })).isRequired,  
    onHide: PropTypes.func.isRequired,
};