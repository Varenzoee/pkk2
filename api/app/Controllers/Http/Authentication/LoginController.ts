import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LoginController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(LoginValidator)

      const user = await User.query()
        .where('username', payload.username)
        .orWhere('email', payload.username)
        .select('*')
        // .select('')
        .firstOrFail()
      const role = await user.related('role').query().where('id', user.roleId).firstOrFail()

      Logger.info('asd')
      if (!(await Hash.verify(user.password, payload.password))) {
        return response.unauthorized('Invalid credentials')
      }

      const token = await auth.use('api').generate(user)

      return response.created({ token, user, role })
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
