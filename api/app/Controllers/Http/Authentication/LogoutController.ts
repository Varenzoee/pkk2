import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()

      return response.ok(auth.use('api').isLoggedOut)
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
