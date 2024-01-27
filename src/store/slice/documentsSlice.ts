import { apiSlice } from 'src/app/api/apiSlice.ts';

export const documentsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDocument: builder.query({
			query: () => ({
				url: '/documents',
				invalidatesTags: ['Documents'],
			}),
			providesTags: (result) => (result ? [{ type: 'Document', id: 'LIST' }] : []),
		}),
		getDocumentById: builder.query({
			query: (id) => ({
				url: `/documents/${id}`,
			}),
		}),
		editDocument: builder.mutation({
			query: ({ formData, id }) => ({
				url: `/documents/${id}`,
				body: formData,
				method: 'PATCH',
			}),
			invalidatesTags: [{ type: 'Document', id: 'LIST' }],
		}),
	}),
});

export const { useEditDocumentMutation, useGetDocumentQuery, useGetDocumentByIdQuery } =
	documentsApiSlice;
