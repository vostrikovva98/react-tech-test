import dayjs from "dayjs";

import { Job } from "models/Job";
import { TagChip } from "components/TagChip"; 
import { DATE_FORMAT } from "config/dateFormat";

export const JobDetail = ({
    title,
    reference,
    address,
    createdAt,
    startDate,
    tags,
    performer,
    optionalPerformers,
}) => {
    return (
        <>
            <p>
                Title: {title}
            </p>
            <p>
                Reference: {reference || "-"}
            </p>
            <p>
                Address: {address || "-"}
            </p>
            <p>
                Created at: {dayjs(new Date(createdAt)).format(DATE_FORMAT)}
            </p>
            <p>
                Start date: {dayjs(new Date(startDate)).format(DATE_FORMAT)}
            </p>
            <p>
                Main performer: {performer?.name || "-"}
            </p>
            <p>
                Annex performers: {optionalPerformers.length? optionalPerformers.map(({ userName }) => userName).join(", "): "-"}
            </p>
            {tags?.length > 0 && (
                <>
                    <span>
                        Tags:
                    </span>
                    {tags.map((tag) => (
                        <TagChip 
                            key={tag.id} 
                            {...tag} 
                        />
                    ))}
                </>
            )}
        </>
    );
};

JobDetail.propTypes = Job.isRequired;