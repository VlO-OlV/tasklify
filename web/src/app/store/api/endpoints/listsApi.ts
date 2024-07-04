import { List } from "../../../types/List";
import { baseApi } from "../baseApi";

export const listsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLists: builder.query<List[], void>({
            query: () => ({
                url: '/lists',
            }),
        }),
        getListById: builder.query<List, string>({
            query: (id) => ({
                url: `/lists/${id}`,
            }),
        }),
        createList: builder.mutation<List, Omit<List, 'id'>>({
            query: ({...createData}) => ({
                url: '/lists',
                method: 'POST',
                body: createData,
            }),
        }),
        updateListById: builder.mutation<List, Partial<List> & Pick<List, 'id'>>({
            query: ({id, ...updateData}) => ({
                url: `/lists/${id}`,
                method: 'PATCH',
                body: updateData,
            }),
        }),
        deleteListById: builder.mutation<List, Pick<List, 'id'>>({
            query: ({id}) => ({
                url: `/lists/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllListsQuery, useGetListByIdQuery, useCreateListMutation, useUpdateListByIdMutation, useDeleteListByIdMutation } = listsApi;