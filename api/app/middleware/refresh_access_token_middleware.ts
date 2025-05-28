import AccessToken from '#models/access_token'
import User from '#models/user'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

/**
 * RefreshToken middleware is used to automatically refresh access tokens
 * when they are about to expire. It checks the remaining time of the
 * current access token and generates a new one if it is less than env.get('AUTH_TOKEN_REFRESH_THRESHOLD') seconds.
 */
export default class RefreshTokenMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const user = ctx.auth.user
      const token = user?.currentAccessToken

      if (token) {
        const tokenRecord = await AccessToken.query()
          .where('hash', token.hash)
          .where('tokenableId', user.id)
          .first()

        if (tokenRecord) {
          const now = DateTime.utc()
          const secondsLeft = DateTime.fromJSDate(tokenRecord.expiresAt!)?.diff(
            now,
            'seconds'
          ).seconds

          if (secondsLeft < env.get('AUTH_TOKEN_REFRESH_THRESHOLD')) {
            await tokenRecord.delete()
            const newToken = await User.accessTokens.create(user)

            ctx.response.cookie(env.get('AUTH_TOKEN_COOKIE_NAME'), newToken.value!.release(), {
              httpOnly: true,
              secure: app.inProduction,
              sameSite: 'lax',
              path: '/',
              maxAge: env.get('AUTH_TOKEN_COOKIE_MAX_AGE'),
            })
          }
        }
      }

      return next()
    } catch (error: any) {
      return ctx.response.unauthorized({ error: 'Unauthorized' })
    }
  }
}
