import { apiSlice } from 'src/app/api/apiSlice.ts';

export const contactsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getContacts: builder.query({
			query: () => ({
				url: '/contacts',
			}),
		}),
		editContact: builder.mutation({
			query: (data) => ({
				url: `/contacts`,
				body: data,
				method: 'PATCH',
			}),
		}),
		feedback: builder.mutation({
			query: (data) => ({
				url: `/feedback`,
				body: data,
				method: 'POST',
			}),
		}),
	}),
});

export const { useEditContactMutation, useFeedbackMutation, useGetContactsQuery } =
	contactsApiSlice;
