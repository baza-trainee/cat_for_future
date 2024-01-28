import { apiSlice } from 'src/app/api/apiSlice.ts';

export const instructionsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInstructions: builder.query({
			query: () => ({
				url: '/instructions',
				invalidatesTags: ['Instructions'],
			}),
			providesTags: (result) => (result ? [{ type: 'Instructions', id: 'LISTDOC' }] : []),
		}),
		getInstructionById: builder.query({
			query: (id) => ({
				url: `/instructions/${id}`,
			}),
		}),
		editInstruction: builder.mutation({
			query: ({ data, id }) => ({
				url: `/instructions/${id}`,
				body: data,
				method: 'PATCH',
			}),
			invalidatesTags: [{ type: 'Instructions', id: 'LISTDOC' }],
		}),
	}),
});

export const { useEditInstructionMutation, useGetInstructionsQuery, useGetInstructionByIdQuery } =
	instructionsApiSlice;
