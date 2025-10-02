import type { QueryFunction } from '@tanstack/react-query'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeQueryTemplate = <
  TKeyGeneratorFn extends (...args: any) => readonly unknown[] = (
    ...args: any
  ) => readonly unknown[],
  TQueryFnData = unknown
>(
  keyGen: TKeyGeneratorFn,
  query: QueryFunction<TQueryFnData, ReturnType<TKeyGeneratorFn>>
): {
  keyGen: TKeyGeneratorFn
  query: QueryFunction<TQueryFnData, ReturnType<TKeyGeneratorFn>>
} => ({ keyGen, query })
/* eslint-enable @typescript-eslint/no-explicit-any */

export type QueryTemplate = ReturnType<typeof makeQueryTemplate>
