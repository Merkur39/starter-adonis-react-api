import AccessToken from '#models/access_token'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async logout({ auth, request, response }: HttpContext) {
    const authToken = request.cookie(env.get('AUTH_TOKEN_COOKIE_NAME'))
    if (!authToken || !auth.user) {
      return response.noContent()
    }

    const tokenRecord = await AccessToken.query()
      .where('hash', auth.user.currentAccessToken.hash)
      .where('tokenableId', auth.user.id)
      .first()

    if (tokenRecord) {
      await tokenRecord.delete()
    }

    return response.clearCookie(env.get('AUTH_TOKEN_COOKIE_NAME')).noContent()
  }
}
