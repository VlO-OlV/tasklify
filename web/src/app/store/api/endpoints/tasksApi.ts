import { CreateTask, Task } from "../../../types/Task";
import { baseApi } from "../baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<Task[], void>({
            query: () => ({
                url: '/tasks',
            }),
        }),
        getTaskById: builder.query<Task, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
            }),
        }),
        createTask: builder.mutation<Task, CreateTask>({
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

export const { useGetAllTasksQuery, useGetTaskByIdQuery, useCreateTaskMutation, useUpdateTaskByIdMutation, useDeleteTaskByIdMutation } = tasksApi;