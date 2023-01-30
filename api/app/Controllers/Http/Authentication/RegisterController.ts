import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class RegisterController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator)

      const role = await Role.findByOrFail('role', payload.role)
      const user = await User.create({ ...payload, roleId: role.id })

      // const token = await auth.use('api').generate(user)

      return response.created({ user, role })
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
