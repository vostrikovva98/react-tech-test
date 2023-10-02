import { useReducer } from "react"; 
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { UNASSIGNED_PERFORMER } from "config/unassignedPerformer";

import { FormSelect } from "../FormSelect";
import { FormInput } from "../FormInput";
import { FormDateInput } from "../FormDateInput";

import { reducer, actionTypes } from "./reducer";
import styles from "./JobForm.module.css";

export const JobForm = ({ job, performers, tags, onSubmit }) => {
    const [jobState, dispatch] = useReducer(reducer, {...job});

    const onChangeTitle = (value) => dispatch({ type: actionTypes.TITLE, payload: value });
    const onChangeReference = (value) => dispatch({ type: actionTypes.REFERENCE, payload: value });
    const onChangeAddress = (value) => dispatch({ type: actionTypes.ADDRESS, payload: value });
    const onChangeStartDate = (value) => dispatch({ type: actionTypes.START_DATE, payload: value });
    const onChangeTags = (value) => dispatch({ type: actionTypes.TAGS, payload: value });
    const onChangePerformer = (value) => dispatch({ type: actionTypes.PERFORMER, payload: value });
    const onChangeOptionalPerformers = (value) => dispatch({ type: actionTypes.OPTIONAL_PERFORMERS, payload: value });

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        onSubmit(jobState);
    };

    return (
        <Form onSubmit={handlerOnSubmit} className={styles.root}>  
            <FormInput
                id="form_title" 
                label="Title"
                type="text"
                value={jobState.title}
                onChange={onChangeTitle}
            />
            <FormInput
                id="form_ref" 
                label="Reference"
                type="text"
                value={jobState.reference}
                onChange={onChangeReference}
            />
            <FormInput
                id="form_address" 
                label="Address"
                type="text"
                value={jobState.address}
                onChange={onChangeAddress}
            />
            <FormDateInput 
                label="Start date"
                value={jobState.startedAt}
                onChange={onChangeStartDate}
            />
            <FormSelect 
                label="Tags"
                isSingle={false}
                options={tags}
                selected={jobState.tags}
                displayValue="title"
                setSelected={onChangeTags}
            />
            <FormSelect 
                label="Main performer"
                isSingle={true}
                options={[...performers, UNASSIGNED_PERFORMER]}
                selected={[jobState.performer]}
                setSelected={onChangePerformer}
            />
            <FormSelect 
                label="Annex performers"
                isSingle={false}
                options={performers}
                selected={jobState.optionalPerformers}
                setSelected={onChangeOptionalPerformers}
            />
            <div className={styles["button-panel"]}>
                <Button type="submit">Submit</Button>
            </div>
        </Form>
    );
};

const TagPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
});
const PerformerPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
});
JobForm.propTypes = {
    job: PropTypes.shape({
        title: PropTypes.string.isRequired,
        reference: PropTypes.string,
        address: PropTypes.string,
        startedAt: PropTypes.number.isRequired,
        optionalPerformers: PropTypes.arrayOf(PerformerPropType).isRequired,
        performer: PerformerPropType.isRequired,
        tags: PropTypes.arrayOf(TagPropType).isRequired,
    }).isRequired,
    performers: PropTypes.arrayOf(PerformerPropType).isRequired,
    tags: PropTypes.arrayOf(TagPropType).isRequired,
    onSubmit: PropTypes.func.isRequired,
};