import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { userActions } from '@/entities/User'

import { BASE_API_URL } from '../const/api/baseApiUrl'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '../const/localStorage/accessTokenKey'

const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => {
    if (token) {
      headers.set('Authorization', 'Bearer ' + token)
    }
    headers.set('Accept', '*/*')
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: 'user/refresh',
        method: 'POST',
      },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      const refreshToken: string = refreshResult.data['Refresh token']
      api.dispatch(userActions.setIsAuth())
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, refreshToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
      api.dispatch(userActions.logOut())
    }
  }
  return result
}

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
