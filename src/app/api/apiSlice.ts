import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://cat-for-future.crabdance.com/api/v1/',
	prepareHeaders: (headers, { endpoint }) => {
		const token = localStorage.getItem('token');
		if (token && endpoint !== 'login' && endpoint !== 'registration' && endpoint !== '/') {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: 'apiSlice',
	tagTypes: ['Document', 'Instructions', 'Cats'],
	baseQuery,
	endpoints: () => ({}),
});
