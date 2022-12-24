import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'
import Score from 'App/Models/Score'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    const employees = await Employee.all()
    const storeData: Score[] = []

    employees.forEach((employee) => {
      for (let i = 0; i < 36; i++) {
        storeData.push({
          ...storeData[0],
          employeeId: employee.id,
          month: (i % 12) + 1,
          year: DateTime.now().year - Math.floor(i / 12),
          attendance: faker.datatype.number({ max: 5, min: 1 }),
          integrity: faker.datatype.number({ max: 5, min: 1 }),
          responsibility: faker.datatype.number({ max: 5, min: 1 }),
          creativity: faker.datatype.number({ max: 5, min: 1 }),
          teamwork: faker.datatype.number({ max: 5, min: 1 }),
          skill: faker.datatype.number({ max: 5, min: 1 }),
        })
      }
    })

    await Score.createMany(storeData)
  }
}
