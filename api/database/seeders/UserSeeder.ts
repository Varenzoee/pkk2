import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      { email: 'admin@gmail.com', username: 'admin', roleId: 1, password: '12345678' },
      { email: 'user@gmail.com', username: 'user', roleId: 2, password: '12345678' },
    ])
  }
}
