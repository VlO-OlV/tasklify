import { Board } from '../../../types/Board';
import { List } from '../../../types/List';
import { Task } from '../../../types/Task';
import { baseApi } from '../baseApi';

export const boardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation<Board, Omit<Board, 'id' | 'updatedAt' | 'createdAt'>>({
      query: ({...createData}) => ({
        url: '/boards',
        method: 'POST',
        body: createData,
      }),
    }),
    updateBoardById: builder.mutation<Board, Partial<Board> & Pick<Board, 'id'>>({
      query: ({id, ...updateData}) => ({
        url: `/boards/${id}`,
        method: 'PATCH',
        body: updateData,
      }),
    }),
    getBoardById: builder.query<Board, string>({
      query: (id) => ({
        url: `/boards/${id}`,
      }),
    }),
    deleteBoardById: builder.mutation<Board, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
    }),
    getBoardLists: builder.query<List[], string>({
      query: (id) => ({
        url: `/boards/${id}/lists`,
      }),
    }),
    getBoardTasks: builder.query<Task[], string>({
      query: (id) => ({
          url: `/boards/${id}/tasks`,
      }),
    }),
  }),
});

export const { useCreateBoardMutation, useDeleteBoardByIdMutation, useUpdateBoardByIdMutation, useGetBoardByIdQuery, useGetBoardListsQuery, useGetBoardTasksQuery } = boardsApi;