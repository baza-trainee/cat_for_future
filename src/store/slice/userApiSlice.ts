import { apiSlice } from 'src/app/api/apiSlice.ts';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: '/user/me',
			}),
		}),
	}),
});

export const { useGetUserQuery } = userApiSlice;
