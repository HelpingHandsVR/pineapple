import { errorHandler } from 'graphql-middleware-error-handler'
import { IMiddlewareFunction } from 'graphql-middleware'

export const makeErrorHandlerMiddleware = (): IMiddlewareFunction => errorHandler({
  captureReturnedErrors: true,
  forwardErrors: false,
  onError (error) {
    console.error('Runtime error forwarded to user', error)

    throw error
  },
})
