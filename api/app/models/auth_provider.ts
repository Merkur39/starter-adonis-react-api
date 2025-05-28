import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'
import type { ProviderName } from 'shared'

export default class AuthProvider extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare provider: ProviderName

  @column()
  declare providerUserId: string

  @column()
  declare username: string

  @column()
  declare avatar: string

  @column()
  declare accessToken: string

  @column()
  declare refreshToken: string

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
