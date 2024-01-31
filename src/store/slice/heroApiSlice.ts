import { apiSlice } from 'src/app/api/apiSlice.ts';

export const heroApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getHero: builder.query({
			query: () => ({
				url: '/hero',
				invalidatesTags: ['Hero'],
			}),
			providesTags: (result) => (result ? [{ type: 'Hero', id: 'Hero' }] : []),
		}),
		editHero: builder.mutation({
			query: (data) => ({
				url: '/hero',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: [{ type: 'Hero', id: 'Hero' }],
		}),
	}),
});

export const { useGetHeroQuery, useEditHeroMutation } = heroApiSlice;
