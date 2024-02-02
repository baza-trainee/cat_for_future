import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { showLogin, showLoginAdmin } from 'src/store/slice/showLoginSlice.ts';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://cat-for-future.crabdance.com/api/v1/',
	prepareHeaders: (headers, { endpoint }) => {
		const token = localStorage.getItem('token');
		if (token && endpoint !== 'registration') {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions = {}
) => {
	const result = await baseQuery(args, api, extraOptions);
	const path = window.location.pathname;
	if (result.error && result.error.status === 401) {
		if (path.startsWith('/admin')) {
			api.dispatch(showLoginAdmin(true));
		} else {
			api.dispatch(showLogin(true));
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'apiSlice',
	tagTypes: ['Document', 'Instructions', 'Cats', 'Cat', 'Hero', 'Stories', 'User'],
	baseQuery: baseQueryReAuth,
	endpoints: () => ({}),
});
