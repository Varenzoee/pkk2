import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(LoginValidator)

      const user = await User.query()
        .where('username', payload.username)
        .orWhere('email', payload.username)
        .firstOrFail()

      if (!(await Hash.verify(user.password, payload.password))) {
        return response.unauthorized('Invalid credentials')
      }

      const token = await auth.use('api').generate(user)

      return response.created({ token, user })
    } catch (error) {
      return response.methodNotAllowed(error)
    }
  }
}
