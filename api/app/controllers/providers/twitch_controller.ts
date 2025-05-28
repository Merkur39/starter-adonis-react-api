import { SocialAuthService } from '#services/social_auth_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { type ProviderName } from 'shared'

@inject()
export default class TwitchController {
  private provider: ProviderName = 'twitch'

  constructor(protected socialAuthService: SocialAuthService) {}

  /**
   * Redirect to Twitch for authentication
   */
  async redirect({ ally, request }: HttpContext) {
    const acceptLanguage = request.header('accept-language')
    const locale = acceptLanguage?.split(',')?.[0] ?? 'en-US'
    const lang = locale.split('-')[0]

    return ally.use('twitch').redirect((req) => {
      req.param('lang', lang)
    })
  }

  /**
   * Callback OAuth Twitch to login or register the user
   */
  async twitchLogin({ ally, response }: HttpContext) {
    const twitch = ally.use('twitch')

    // Check if the user has canceled the authentication process or if there are errors
    if (twitch.accessDenied() || twitch.stateMisMatch() || twitch.hasError()) {
      return response.redirect(`${env.get('CLIENT_URL')}?error=${twitch.getError()}`)
    }

    const twitchUser = await twitch.user()
    const { token } = await this.socialAuthService.login(this.provider, twitchUser)

    response.cookie(env.get('AUTH_TOKEN_COOKIE_NAME'), token.value?.release(), {
      httpOnly: true,
      secure: app.inProduction,
      sameSite: 'lax',
      maxAge: env.get('AUTH_TOKEN_COOKIE_MAX_AGE'),
      path: '/',
    })

    return response.redirect(env.get('CLIENT_URL'))
  }
}
