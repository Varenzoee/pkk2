import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoleSeeder from './RoleSeeder'
import UserSeeder from './UserSeeder'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await new RoleSeeder(this.client).run()
    await new UserSeeder(this.client).run()
  }
}
