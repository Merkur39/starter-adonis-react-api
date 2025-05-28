import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_providers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('provider').notNullable()
      table.string('provider_user_id').notNullable()
      table.string('username')
      table.string('avatar')
      table.string('access_token')
      table.string('refresh_token')
      table.timestamp('expires_at', { useTz: true })

      table.unique(['provider', 'provider_user_id'])
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
