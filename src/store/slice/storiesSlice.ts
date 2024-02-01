import { apiSlice } from 'src/app/api/apiSlice.ts';
import { IStory } from 'src/types/IStory';

export const storiesSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStories: builder.query({
			query: () => ({
				url: '/stories',
				invalidatesTags: ['Stories'],
			}),
			providesTags: (result) => (result ? [{ type: 'Stories', id: 'Stories' }] : []),
		}),
		editStories: builder.mutation<IStory, string>({
			query: (id) => ({
				url: `/stories/${id}`,
				method: 'PATCH',
				invalidatesTags: ['Stories'],
			}),
			invalidatesTags: [{ type: 'Stories', id: 'Stories' }],
		}),
	}),
});

export const { useGetStoriesQuery, useEditStoriesMutation } = storiesSlice;
