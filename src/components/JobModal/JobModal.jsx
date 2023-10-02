import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useGetJobPerformersQuery, useGetJobQuery, useGetJobsQuery } from "services/jobApi";

import { JobEdit } from "./JobEdit";
import { JobDetail } from "./JobDetail";
import { prepareDataForJobEdit } from "./util";
import styles from "./JobModal.module.css";

export const JobModal = ({ onHide, job }) => {   
    const { data: jobs } = useGetJobsQuery();
    const { data: jobPerformers } = useGetJobPerformersQuery(job.id);
    const { data: jobState } = useGetJobQuery(job);
    const [isEditMode, setIsEditMode] = useState(false);

    const currentJob = useMemo(() => jobs && jobs.find(({ id }) => job.id === id), [job.id, jobs]);

    const handlerOnClickSetIsEditMode = () => setIsEditMode((prev) => !prev);

    return (
        <Modal 
            show
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Job Modal</Modal.Title>
                {!isEditMode && (
                    <Button className={styles["edit-button"]} onClick={handlerOnClickSetIsEditMode}>
                        Edit
                    </Button>
                )}
            </Modal.Header>
            <Modal.Body>
                {jobState &&
                    <>
                        {isEditMode? (
                            <JobEdit 
                                {...prepareDataForJobEdit({
                                    currentJob, 
                                    optionalPerformers: jobPerformers, 
                                    jobState,
                                })} 
                                id={job.id}
                                onHide={onHide}
                            />
                        ):(
                            <JobDetail 
                                {...currentJob}
                                address={jobState?.jobAddress?.value}
                                optionalPerformers={jobPerformers || []}
                            />
                        )}
                    </>
                }
            </Modal.Body>
        </Modal>
    );
};

JobModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    job: PropTypes.shape({
        id: PropTypes.string.isRequired,
        stepId: PropTypes.string.isRequired,
    }).isRequired,
};