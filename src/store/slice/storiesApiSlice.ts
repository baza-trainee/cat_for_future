import { apiSlice } from 'src/app/api/apiSlice.ts';
import { IStory } from 'src/types/IStory.ts';

export const storiesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStories: builder.query<IStory[], string>({
			query: () => ({
				url: '/stories',
				invalidatesTags: ['Stories'],
			}),
			providesTags: (result) => (result ? [{ type: 'Stories', id: 'LIST' }] : []),
		}),
		getStoryById: builder.query({
			query: (id) => ({
				url: `/stories/${id}`,
			}),
		}),
		editStory: builder.mutation({
			query: ({ data, id }) => ({
				url: `/stories/${id}`,
				body: data,
				method: 'PATCH',
			}),
			invalidatesTags: [{ type: 'Stories', id: 'LIST' }],
		}),
	}),
});

export const { useGetStoriesQuery, useEditStoryMutation, useGetStoryByIdQuery } = storiesApiSlice;
