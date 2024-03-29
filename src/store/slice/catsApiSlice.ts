import { apiSlice } from 'src/app/api/apiSlice.ts';
import { ICat } from 'src/types/ICat';

export const catsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCats: builder.query<ICat[], string>({
			query: () => ({
				url: '/cats',
				invalidatesTags: ['Cats'],
			}),
			providesTags: (result) => (result ? [{ type: 'Cats', id: 'LIST' }] : []),
		}),
		getMyCats: builder.query<ICat[], string>({
			query: () => ({
				url: '/user/me/cats',
				invalidatesTags: ['Cats'],
			}),
			providesTags: (result) => (result ? [{ type: 'Cats', id: 'LIST' }] : []),
		}),
		reserveCat: builder.mutation({
			query: (id) => ({
				url: `/cats/${id}/reserve`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
		cancelReservationCat: builder.mutation({
			query: (id) => ({
				url: `/cats/${id}/cancel-reservation`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
		getCatById: builder.query({
			query: (id) => ({
				url: `/cats/${id}`,
			}),
		}),
		removeCat: builder.mutation({
			query: (id) => ({
				url: `/cats/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
		editCat: builder.mutation({
			query: ({ data, id }) => ({
				url: `/cats/${id}`,
				body: data,
				method: 'PATCH',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
		addCat: builder.mutation({
			query: (data) => ({
				url: '/cats',
				body: data,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Cats', id: 'LIST' }],
		}),
	}),
});

export const {
	useGetCatsQuery,
	useReserveCatMutation,
	useCancelReservationCatMutation,
	useGetMyCatsQuery,
	useAddCatMutation,
	useEditCatMutation,
	useRemoveCatMutation,
	useGetCatByIdQuery,
} = catsApiSlice;
