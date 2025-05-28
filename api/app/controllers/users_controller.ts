import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async get({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      return response.ok({ user })
    } catch (error: any) {
      return response.unauthorized({ error: 'User not found', details: error.message })
    }
  }
}
