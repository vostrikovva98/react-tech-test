import Card from "react-bootstrap/esm/Card";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import clsx from "clsx";

import { JobCard } from "components/JobCard";
import { Job } from "models/Job";

import styles from "./JobColumn.module.css";

export const JobColumn = ({
    performer,
    jobs,
}) => {
    const [{ isOver }, drop] = useDrop({
        accept: "job_type",
        drop: () => ({ columnId: performer.id }),
        collect: (monitor) => ({ isOver: monitor.isOver() }),
    });
    
    return (
        <Card 
            ref={drop}
            className={styles.root}
        >
            <Card.Header className={clsx(styles.header, {
                [styles["is-hovered"]]: isOver,
            })}>            
                <Card.Title>
                    {performer.name}
                </Card.Title>
            </Card.Header>
            <Card.Body className={styles.body}>
                {jobs.map((job) => (
                    <JobCard 
                        key={job.id} 
                        {...job} 
                        currentColumnId={performer.id}
                    />
                ))}
            </Card.Body>
        </Card>
    );
};

JobColumn.propTypes = {
    performer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    jobs: PropTypes.arrayOf(Job).isRequired,
};