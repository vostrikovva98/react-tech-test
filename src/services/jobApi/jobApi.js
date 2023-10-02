import { createApi } from "@reduxjs/toolkit/query/react";

import { REACT_APP_API_URL } from "config/envConstants";
import { SORT_ORDER } from "config/sortOrders";
import { axiosBaseQuery } from "helpers/axiosBaseQuery";

import { prepareBodyForUpdateJob } from "./util";

const jobApiTags = {
    job: "job",
    performer: "performer",
    tag: "tag",
};

export const jobApi = createApi({
    reducerPath: "job",
    tagTypes: Object.values(jobApiTags),
    baseQuery: axiosBaseQuery({ baseUrl: REACT_APP_API_URL }),
    endpoints: (build) => ({
        getJobs: build.query({
            query: (sortDateOrder = SORT_ORDER.ASC) => ({
                url:  "/jobs.json",
                method: "GET",
                params: {
                    order_field: "start_date",
                    order_direction: sortDateOrder,
                }
            }),
            transformResponse: (response) => response.data.data,
            providesTags: [jobApiTags.job]
        }),
        getJob: build.query({
            query: ({ id, stepId }) => ({
                url: `/jobs/${id}/cells/${stepId}.json`,
                method: "GET",
            }),
            transformResponse: (response) => response.data.cell,
            providesTags: [jobApiTags.job],
        }),
        updateJob: build.mutation({
            query: ({ id, stepId, cellBody }) => ({
                url: `/jobs/${id}/cells/${stepId}.json`,
                method: "PUT",
                body: prepareBodyForUpdateJob({ stepId, cellBody }),
            }),
            invalidatesTags: [jobApiTags.job],
        }),
        assignPerformer: build.mutation({
            query: ({ jobId, performerId }) => ({
                url: `/jobs/${jobId}/performers/${performerId}.json`,
                method: "PUT",
            }),
            invalidatesTags: [jobApiTags.job],
            keepUnusedData: false,
        }),
        unassignPerformer: build.mutation({
            query: ({ jobId, performerId }) => ({
                url: `/jobs/${jobId}/performers/${performerId}.json`,
                method: "DELETE",
            }),
            invalidatesTags: [jobApiTags.job],
            keepUnusedData: false,
        }),
        assignReaderPerformer: build.mutation({
            query: ({ jobId, performerId }) => ({
                url: `/jobs/${jobId}/performers/${performerId}.json?reader=true`,
                method: "PUT",
            }),
            invalidatesTags: [jobApiTags.job],
            keepUnusedData: false,
        }),
        unassignReaderPerformer: build.mutation({
            query: ({ jobId, performerId }) => ({
                url: `/jobs/${jobId}/performers/${performerId}.json?reader=1`,
                method: "DELETE",
            }),
            invalidatesTags: [jobApiTags.job],
            keepUnusedData: false,
        }),
        updateJobTags: build.mutation({
            query: ({ jobId, tagIds }) => ({
                url: `/tags/jobs/${jobId}/references.json`,
                method: "PUT",
                body: { tags: tagIds }
            }),
            invalidatesTags: [jobApiTags.job],
            keepUnusedData: false,
        }), 
        getPerformers: build.query({
            query: () => ({
                url: "/provider/agenda_performers.json",
                method: "GET",
            }),
            transformResponse: (response) => {
                return response.data.data.map(({ id, userName }) => ({
                    id,
                    name: userName,
                }));
            },
            providesTags: [jobApiTags.performer],
        }),
        getJobPerformers: build.query({
            query: (id) => ({
                url: `/jobs/${id}/performers.json`,
                method: "GET",
            }),
            transformResponse: (response) => response.data.data,
            providesTags: [jobApiTags.job]
        }),
        getTags: build.query({
            query: () => ({
                url: "/tags.json",
                method: "GET",
            }),
            transformResponse: (response) => response.data.data,
            providesTags: [jobApiTags.tag],
        })
    })
});



export const { 
    useGetJobsQuery,
    useGetJobQuery,
    useUpdateJobMutation, 
    useAssignPerformerMutation,
    useUnassignPerformerMutation,
    useAssignReaderPerformerMutation,
    useUnassignReaderPerformerMutation,
    useUpdateJobTagsMutation,
    useGetPerformersQuery,
    useGetJobPerformersQuery,
    useGetTagsQuery,
} = jobApi; 