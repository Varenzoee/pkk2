import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Score from 'App/Models/Score'
import ScoreStoreValidator from 'App/Validators/ScoreStoreValidator'
import ScoreUpdateValidator from 'App/Validators/ScoreUpdateValidator'

export default class ScoresController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { month, year } = request.qs()
      let data: Score[] = []
      if (request.qs()) {
        if (!month || !year) {
          return response.badRequest({ message: 'month and year must in query' })
        }
        data = await Score.query().where('month', month).where('year', year)
        if (!data.length) {
          return response.notFound()
        }
      } else {
        data = await Score.all()
      }

      return response.ok(data)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async create({ response }: HttpContextContract) {
    return response.notFound()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ScoreStoreValidator)
      const item = await Score.updateOrCreate(
        {
          employeeId: payload.employeeId,
          month: payload.month,
          year: payload.year,
        },
        {
          attendance: payload.attendance,
          integrity: payload.integrity,
          responsibility: payload.responsibility,
          teamwork: payload.teamwork,
          skill: payload.skill,
          creativity: payload.creativity,
        }
      )

      return response.created(item)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const item = await Score.findOrFail(request.param('id'))
      return response.ok(item)
    } catch (error) {
      return response.notFound()
    }
  }

  public async edit({ response }: HttpContextContract) {
    return response.notFound()
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ScoreUpdateValidator)
      const item = await Score.findOrFail(request.param('id'))
      item.month = payload.month
      item.year = payload.year
      item.attendance = payload.attendance
      item.integrity = payload.integrity
      item.responsibility = payload.responsibility
      item.teamwork = payload.teamwork
      item.skill = payload.skill
      item.creativity = payload.creativity
      await item.save()

      return response.created(item)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const item = await Score.findOrFail(request.param('id'))
    await item.delete()

    return response.ok(item)
  }
}
