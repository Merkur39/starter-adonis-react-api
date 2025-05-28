import AccessToken from '#models/access_token'
import AuthProvider from '#models/auth_provider'
import env from '#start/env'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => AuthProvider)
  declare providers: HasMany<typeof AuthProvider>

  @hasMany(() => AccessToken, { foreignKey: 'tokenableId' })
  declare accessTokens: HasMany<typeof AccessToken>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: `${env.get('AUTH_TOKEN_COOKIE_MAX_AGE') * 1000}`, // Convert seconds to milliseconds
  })
}
