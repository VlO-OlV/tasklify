import { Task } from "../../../types/Task";
import { baseApi } from "../baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTaskById: builder.query<Task, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
            }),
        }),
        createTask: builder.mutation<Task, Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
            query: ({...createData}) => ({
                url: '/tasks',
                method: 'POST',
                body: createData,
            }),
        }),
        updateTaskById: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
            query: ({id, ...updateData}) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: updateData,
            }),
        }),
        deleteTaskById: builder.mutation<Task, Pick<Task, 'id'>>({
            query: ({id}) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetTaskByIdQuery, useCreateTaskMutation, useUpdateTaskByIdMutation, useDeleteTaskByIdMutation } = tasksApi;