import * as sentry from '@sentry/node'

import { ApolloError } from 'apollo-server-express'
import {
  ApolloServerPlugin,
  GraphQLRequestContextDidEncounterErrors,
  BaseContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base'

export class SentryApolloServerPlugin implements ApolloServerPlugin {
  requestDidStart (): GraphQLRequestListener<BaseContext> {
    /* Within this returned object, define functions that respond
       to request-specific lifecycle events. */
    return {
      didEncounterErrors (ctx: GraphQLRequestContextDidEncounterErrors<BaseContext>) {
        // If we couldn't parse the operation, don't
        // do anything here
        if (!ctx.operation) {
          return
        }

        for (const err of ctx.errors) {
          // Only report internal server errors,
          // all errors extending ApolloError should be user-facing
          if (err instanceof ApolloError) {
            continue
          }

          // Add scoped report details and send to Sentry
          sentry.withScope(scope => {
            // Annotate whether failing operation was query/mutation/subscription
            scope.setTag('kind', ctx.operation.operation)

            // Log query and variables as extras (make sure to strip out sensitive data!)
            scope.setExtra('query', ctx.request.query)
            scope.setExtra('variables', ctx.request.variables)

            if (err.path) {
              // We can also add the path as breadcrumb
              scope.addBreadcrumb({
                category: 'query-path',
                message: err.path.join(' > '),
                level: sentry.Severity.Debug,
              })
            }

            sentry.captureException(err)
          })
        }
      },
    }
  }
}
