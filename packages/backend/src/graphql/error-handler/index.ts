import { errorHandler } from 'graphql-middleware-error-handler'
import { IMiddlewareFunction } from 'graphql-middleware'
import { Context } from '../context'

export const makeErrorHandlerMiddleware = (): IMiddlewareFunction => errorHandler({
  captureReturnedErrors: true,
  forwardErrors: false,
  onError (error, context: Context) {
    context.log.error(error, 'runtime error forwarded to user')

    throw error
  },
})
