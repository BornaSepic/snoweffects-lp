import {
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as _useQuery,
  keepPreviousData
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SECOND } from '../time/ms'

export type ArrayQueryKey = readonly unknown[]

export const useQuery = function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends ArrayQueryKey = ArrayQueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  rawOptions?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TData, TError> {
  const { isPreview } = useRouter()

  return _useQuery({
    queryFn,
    queryKey,
    placeholderData: keepPreviousData,
    gcTime: isPreview ? 10 * SECOND : 300 * SECOND,
    ...rawOptions
  })
}
