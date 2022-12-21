import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EmployeeFactory from 'Database/factories/EmployeeFactory'
import RoleSeeder from './RoleSeeder'
import UserSeeder from './UserSeeder'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await new RoleSeeder(this.client).run()
    await new UserSeeder(this.client).run()

    await EmployeeFactory.createMany(10)
  }
}
