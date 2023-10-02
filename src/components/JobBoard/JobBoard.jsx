import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
 
import { JobColumn } from "components/JobColumn";
import { UNASSIGNED_PERFORMER } from "config/unassignedPerformer";
import { useGetJobsQuery, useGetPerformersQuery } from "services/jobApi";
import { SORT_ORDER } from "config/sortOrders";

import styles from "./JobBoard.module.css";

export const JobBoard = () => {
    const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);
    const { data: jobs } = useGetJobsQuery(sortOrder);
    const { data: performers } = useGetPerformersQuery(); 

    const jobsByPerformer = useMemo(() => {
        if(!performers || !jobs) return [];

        const preparedArray = performers.map(({ id, name }) => ({
            jobs: jobs.filter(({ performerUserId }) => performerUserId === id),
            performer: { id, name }
        }));
        preparedArray.push({
            jobs: jobs.filter(({ performerUserId }) => performerUserId === null),
            performer: UNASSIGNED_PERFORMER,
        });

        return preparedArray;
    }, [jobs, performers]);

    const handlerOnSortClick = () => setSortOrder((prev) => prev === SORT_ORDER.ASC? SORT_ORDER.DESC: SORT_ORDER.ASC);

    return (
        <div className={styles.root}>
            <div className={styles["title-container"]}>
                <h1>JobBoard</h1>
                <Button onClick={handlerOnSortClick}>start date by {sortOrder}</Button>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className={styles["board-container"]}>
                    {jobsByPerformer.map(({ performer, jobs }) => (
                        <JobColumn 
                            key={performer.id} 
                            jobs={jobs}
                            performer={performer} 
                        />
                    ))}
                </div>
            </DndProvider>
        </div>
    );
};