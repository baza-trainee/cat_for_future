import { apiSlice } from 'src/app/api/apiSlice.ts';
import { ICat } from 'src/types/ICat';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: '/user/me',
			}),
		}),
		getMyCats: builder.query<ICat[], string>({
			query: () => ({
				url: '/cats',
				invalidatesTags: ['Cats'],
			}),
			providesTags: (result) => (result ? [{ type: 'Cats', id: 'LIST' }] : []),
		}),
	}),
});

export const { useGetUserQuery, useGetMyCatsQuery } = userApiSlice;
