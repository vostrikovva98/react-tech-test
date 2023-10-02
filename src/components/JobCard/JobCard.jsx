import { Card } from "react-bootstrap";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import dayjs from "dayjs";

import { TagChip } from "components/TagChip";
import { Tag } from "models/Tag";
import { UNASSIGNED_PERFORMER_ID } from "config/unassignedPerformer";
import { useManagerModal } from "components/JobModalManager";
import { useAssignPerformerMutation, useUnassignPerformerMutation } from "services/jobApi";
import { DATE_FORMAT } from "config/dateFormat";

import styles from "./JobCard.module.css";

export const JobCard = ({ 
    id,
    title,
    reference,
    createdAt,
    startDate,
    tags,
    className,
    currentStepId,
    currentColumnId,
}) => {         
    const [unassignPerformer] = useUnassignPerformerMutation();
    const [assignPerformer] = useAssignPerformerMutation();
    const { showModal } = useManagerModal();

    const [{ isDragging }, drag] = useDrag({
        end: (_, monitor) => {
            const dropResult = monitor.getDropResult();

            if(!dropResult) return;

            const { columnId } = dropResult;
            if(currentColumnId === columnId) return;
            
            if(columnId === UNASSIGNED_PERFORMER_ID) {
                unassignPerformer({ 
                    jobId: id, 
                    performerId: currentColumnId, 
                });
            }
            else {
                assignPerformer({
                    jobId: id, 
                    performerId: columnId, 
                });
            }
        },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        type: "job_type"
    });

    const handlerOnCardClick = () => showModal({ id, stepId: currentStepId });

    return (
        <Card 
            className={clsx(styles.root, className, {
                [styles["is-dragged"]]: isDragging,
            })} 
            ref={drag}
            onClick={handlerOnCardClick}
        >
            <Card.Header className={styles.header}>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                {reference && (
                    <Card.Text>
                        Reference: {reference}
                    </Card.Text>
                )}
                <Card.Text>
                    Created at: {dayjs(new Date(createdAt)).format(DATE_FORMAT)}
                </Card.Text>
                <Card.Text>
                    Start date: {dayjs(new Date(startDate)).format(DATE_FORMAT)}
                </Card.Text>
                {tags.length > 0 && (
                    <>
                        <Card.Text className={styles["tag-text"]}>
                            Tags:
                        </Card.Text>
                        {tags.map((tag) => (
                            <TagChip 
                                key={tag.id} 
                                {...tag} 
                            />
                        ))}
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

JobCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    reference: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(Tag).isRequired,
    className: PropTypes.string,
    currentStepId: PropTypes.string.isRequired,
    currentColumnId: PropTypes.string.isRequired,
};