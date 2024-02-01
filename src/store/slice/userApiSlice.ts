import { apiSlice } from 'src/app/api/apiSlice.ts';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: '/user/me',
				invalidatesTags: ['User'],
			}),
			providesTags: (result) => (result ? [{ type: 'User', id: 'LIST' }] : []),
		}),
		deleteUser: builder.mutation({
			query: () => ({
				url: '/user/me',
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
		updateUser: builder.mutation({
			query: (body) => ({
				url: '/user/me',
				method: 'PUT',
				body,
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
	}),
});

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } = userApiSlice;
