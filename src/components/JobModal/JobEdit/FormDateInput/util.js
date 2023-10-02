import dayjs from "dayjs";

export const getSeconds = (time) => {
    const [hours, minutes] = time.split(":");

    return 60 * 60 * Number(hours) + 60 * Number(minutes);
};

export const getStateFromTimestamp = (value) => {
    const date = dayjs(value);

    return {
        date: date.format("YYYY-MM-DD"),
        time: date.format("HH:mm:ss"),
    };
};

export const getTimestampFromState = (state) => {
    const date = dayjs(state.date);
    const seconds = getSeconds(state.time);


    const newTimestamp = date.add(seconds, "s");
    return newTimestamp.unix() * 1000;
};