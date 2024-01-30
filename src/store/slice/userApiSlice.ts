import { apiSlice } from 'src/app/api/apiSlice.ts';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: '/user/me',
			}),
		}),
		deleteUser: builder.mutation({
			query: () => ({
				url: '/user/me',
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
	}),
});

export const { useGetUserQuery, useDeleteUserMutation } = userApiSlice;
