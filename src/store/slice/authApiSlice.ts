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
		passChange: builder.mutation({
			query: (data) => ({
				url: '/auth/change-password',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	usePassChangeMutation,
	useLogOutMutation,
	useRegistrationMutation,
} = authApiSlice;
