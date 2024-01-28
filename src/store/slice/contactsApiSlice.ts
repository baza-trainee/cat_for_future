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
	}),
});

export const { useEditContactMutation, useGetContactsQuery } = contactsApiSlice;
