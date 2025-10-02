import { ApiError as DatoApiError } from '@datocms/cma-client-node'
import { pipe } from 'remeda'
import { ZodError } from 'zod'
import { AppError } from '../errors/app-error.js'
import type { Logger } from '../logger/index.js'

type ExecaError = Error & Record<'stderr', Buffer | string>

const isExecaError = (err: unknown): err is ExecaError => {
  return (
    err instanceof Error &&
    'stderr' in err &&
    (typeof err.stderr === 'string' || err.stderr instanceof Buffer)
  )
}

type Result =
  | {
      logged: true
      err: AppError
    }
  | { logged: false; err: unknown }

export const makeLogErrorDetails = async (
  logger: Logger
): Promise<(err: unknown) => AppError> => {
  const { ClientError } = await import('graphql-request')

  const logDatoApiError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    const err = result.err instanceof DatoApiError ? result.err : null

    if (err == null) {
      return result
    }

    const message = err.message.split('\n').at(0) || 'Unknown error'

    logger.error(
      {
        errors: err.errors
      },
      message
    )

    return {
      logged: true,
      err: new AppError(message, {
        details: { source: 'dato-api-client' }
      })
    }
  }

  const logGraphqlRequestError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    const err = result.err instanceof ClientError ? result.err : null

    if (err == null) {
      return result
    }

    const message = `GraphQL Error: ${
      err.response.errors?.at(0)?.message || err.message
    }`

    logger.error(
      {
        errors: err.response.errors,
        variables: err.request.variables
      },
      message
    )

    return {
      logged: true,
      err: new AppError(message, {
        details: { source: 'graphql-request' }
      })
    }
  }

  const logZodError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    const err = result.err instanceof ZodError ? result.err : null

    if (err == null) {
      return result
    }

    const path = (err.issues[0]?.path || []).join('/')

    const message = `${path} ${err.issues[0]?.message || 'Unknown error'} [${err.issues[0]?.code || 'UNKNOWN'}]`

    logger.error({ type: 'validation_error', issues: err.issues }, message)

    return {
      logged: true,
      err: new AppError(message, {
        details: { source: 'Zod' }
      })
    }
  }

  const logExecaError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    const err = isExecaError(result.err) ? result.err : null

    if (err == null) {
      return result
    }

    const message = err.message.split('\n').at(0) ?? 'Unknown error'

    err.stderr
      .toString()
      .split('\n')
      .filter((line) => line)
      .forEach((line) => {
        logger.error(line)
      })

    logger.error(message)

    return {
      logged: true,
      err: new AppError(message, {
        details: { source: 'Child Process' }
      })
    }
  }

  const logGenericError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    const err = result.err instanceof Error ? result.err : null

    if (err == null) {
      return result
    }

    logger.error(err)

    return {
      logged: true,
      err: new AppError(err.message, {
        details: { source: err.name || 'Unknown' }
      })
    }
  }

  const logUnknownError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    if (typeof result.err === 'string') {
      logger.error(result.err.trim())
    } else {
      logger.error({ err: result.err }, 'Error of unknown type')
    }

    return {
      logged: true,
      err: new AppError('Error of unknown type', {
        traceTag: '37d79dbb14ba45409556d3f0cae43a4b'
      })
    }
  }

  const unpackAppError = (result: Result): Result => {
    if (result.logged) {
      return result
    }

    const err = result.err instanceof AppError ? result.err : null

    if (err == null) {
      return result
    }

    const { err: nestedError, ...details } = err.details

    if (nestedError == null) {
      logger.error(details, err.message)
      return { err, logged: true }
    }

    if (nestedError instanceof AppError) {
      logger.error({ ...details, ...nestedError.details }, err.message)

      return {
        logged: true,
        err: nestedError
      }
    }

    if (nestedError instanceof Error) {
      logger.error(details, err.message)

      return {
        logged: false,
        err: nestedError
      }
    }

    logger.error(details, err.message)

    return {
      err,
      logged: true
    }
  }

  return (err: unknown): AppError => {
    // Avoid logging the same error twice
    if (err instanceof AppError && err.details.logged) {
      return err
    }

    const result = pipe(
      { err, logged: false },
      unpackAppError,
      logZodError,
      logGraphqlRequestError,
      logDatoApiError,
      logExecaError,
      logGenericError,
      logUnknownError
    )

    if (result.logged === false) {
      throw new AppError("Error wasn't logged", {
        err,
        traceTag: 'da63cae0ad9f42429ce66625746417a1'
      })
    }

    result.err.details.logged = true

    return result.err
  }
}
