import { BoardUser } from '../../../types/BoardUser';
import { baseApi } from '../baseApi';

export const boardUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBoardUsers: builder.query<BoardUser[], void>({
      query: () => ({
        url: '/boardUsers/me',
      }),
    }),
    createBoardUser: builder.mutation<BoardUser, Omit<BoardUser, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (createData) => ({
        url: '/boardUsers',
        method: 'POST',
        body: createData,
      }),
    }),
    updateBoardUserById: builder.mutation<BoardUser, Partial<BoardUser> & Pick<BoardUser, 'id'>>({
      query: ({id, ...updateData}) => ({
        url: `/boardUsers/${id}`,
        method: 'PATCH',
        body: updateData,
      }),
    }),
    deleteBoardUserById: builder.mutation<BoardUser, string>({
      query: (id) => ({
        url: `/boardUsers/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateBoardUserMutation, useDeleteBoardUserByIdMutation, useGetMyBoardUsersQuery, useUpdateBoardUserByIdMutation } = boardUsersApi;