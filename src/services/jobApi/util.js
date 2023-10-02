import snakecaseKeys from "snakecase-keys";

export const prepareBodyForUpdateJob = ({
    stepId,
    cellBody,
}) => {
    return {
        data: {
            [stepId]: snakecaseKeys(cellBody),
        }
    }; 
};