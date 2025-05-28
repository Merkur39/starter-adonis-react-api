import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class AccessToken extends BaseModel {
  public static table = 'auth_access_tokens'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'tokenable_id' })
  declare tokenableId: number

  @column()
  declare name: string | null

  @column()
  declare hash: string

  @column()
  declare type: string

  @column()
  declare abilities: string

  @column({ columnName: 'created_at' })
  declare createdAt: Date

  @column({ columnName: 'updated_at' })
  declare updatedAt: Date

  @column({ columnName: 'last_used_at' })
  declare lastUsedAt: Date | null

  @column({ columnName: 'expires_at' })
  declare expiresAt: Date | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
