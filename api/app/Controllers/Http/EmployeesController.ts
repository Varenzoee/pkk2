import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import EmployeeValidator from 'App/Validators/EmployeeValidator'

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {
    const data = await Employee.all()
    return response.ok(data)
  }

  public async create({ response }: HttpContextContract) {
    return response.notFound()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(EmployeeValidator)
      const item = await Employee.create(payload)

      return response.created(item)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ response }: HttpContextContract) {
    return response.notFound()
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
