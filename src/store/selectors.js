export const selectIsAnythingLoading = ({ job, auth }) => Object.values(job.queries).some(query => query.status === "pending")
    || Object.values(auth.queries).some(query => query.status === "pending")
    || Object.values(job.mutations).some(query => query.status === "pending")
    || Object.values(auth.mutations).some(query => query.status === "pending");