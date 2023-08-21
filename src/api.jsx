// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const COHORT_NAME = '2209-FTB-ET-WEB-FT'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`,
    // copied from https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/authentication?from-embed=&file=/src/app/services/auth.ts:395-708
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      query: () => '/posts'
    }),

    registerUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/register',
        method: 'POST',
        body: credentials
      })
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials
      })
    })

  })
})

// Export the auto-generated hooks for the endpoints
export const { useGetPostsQuery, useRegisterUserMutation, useLoginMutation } = apiSlice


