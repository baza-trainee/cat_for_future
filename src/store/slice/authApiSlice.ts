import { apiSlice } from 'src/app/api/apiSlice.ts';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => {
				return {
					url: '/auth/login',
					method: 'POST',
					body: credentials,
				};
			},
		}),
		logOut: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
		}),
		registration: builder.mutation({
			query: (credentials) => ({
				url: '/user',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
	}),
});

export const { useLoginMutation, useLogOutMutation, useRegistrationMutation } = authApiSlice;
