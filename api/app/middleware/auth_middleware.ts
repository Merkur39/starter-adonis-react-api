import env from '#start/env'
import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    const tokenValue: string | undefined = ctx.request.cookie(env.get('AUTH_TOKEN_COOKIE_NAME'))
    if (tokenValue) {
      ctx.request.headers().authorization = `Bearer ${tokenValue}`
    }

    try {
      await ctx.auth.authenticateUsing(options.guards)
      return next()
    } catch (error: any) {
      return ctx.response.unauthorized({ error: 'Unauthorized', details: error.message })
    }
  }
}
