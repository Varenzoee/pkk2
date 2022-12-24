import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ScoresOfEmployeesController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Database.from('employees')
        .join('scores', 'scores.employee_id', 'employees.id')
        .select([
          'nip',
          'fullname',
          'month',
          'year',
          'attendance',
          'integrity',
          'responsibility',
          'teamwork',
          'skill',
          'creativity',
          'scores.created_at',
          'scores.updated_at',
        ])
        .orderBy('nip', 'asc')
        .orderBy('year', 'desc')
        .orderBy('month', 'desc')

      return response.ok(data)
    } catch (error) {
      return response.notFound(error)
    }
  }
}
