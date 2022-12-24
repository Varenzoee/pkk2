import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import EmployeeStoreValidator from 'App/Validators/EmployeeStoreValidator'
import EmployeeUpdateValidator from 'App/Validators/EmployeeUpdateValidator'

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
      const payload = await request.validate(EmployeeStoreValidator)
      const item = await Employee.create(payload)

      return response.created(item)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const item = await Employee.findOrFail(request.param('id'))
    return response.ok(item)
  }

  public async edit({ response }: HttpContextContract) {
    return response.notFound()
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(EmployeeUpdateValidator)

      const item = await Employee.query().where('id', request.param('id')).update(payload)

      return response.created(item)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const item = await Employee.findOrFail(request.param('id'))
      await item.delete()

      return response.ok(item)
    } catch (error) {
      return response.notFound()
    }
  }
}
