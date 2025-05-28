import AccessToken from '#models/access_token'
import AuthProvider from '#models/auth_provider'
import User from '#models/user'
import { DateTime } from 'luxon'
import type { ProviderName, SocialUser } from 'shared'

export class SocialAuthService {
  async login(providerName: ProviderName, socialUser: SocialUser) {
    const { user } = await this.findOrCreateUserAndProvider(providerName, socialUser)
    await this.deleteOldTokens(user.id)
    const token = await User.accessTokens.create(user)

    return { token }
  }

  private async findOrCreateUserAndProvider(providerName: ProviderName, socialUser: SocialUser) {
    let user: User
    let authProvider = await AuthProvider.query()
      .where('provider', providerName)
      .where('provider_user_id', socialUser.id)
      .first()

    const providerData = {
      username: socialUser.name,
      avatar: socialUser.avatarUrl,
      accessToken: socialUser.token.token,
      refreshToken: socialUser.token.refreshToken,
      expiresAt: socialUser.token.expiresAt
        ? DateTime.fromJSDate(socialUser.token.expiresAt)
        : undefined,
    }

    if (!authProvider) {
      user = await User.create({})
      authProvider = await AuthProvider.create({
        userId: user.id,
        provider: providerName,
        providerUserId: socialUser.id,
        ...providerData,
      })
    } else {
      await authProvider.merge(providerData).save()
      user = await authProvider.related('user').query().firstOrFail()
    }

    return { user }
  }

  private async deleteOldTokens(userId: number) {
    const tokenRecords = await AccessToken.query().where('tokenableId', userId)
    if (tokenRecords.length > 0) {
      await Promise.all(tokenRecords.map((t) => t.delete()))
    }
  }
}
