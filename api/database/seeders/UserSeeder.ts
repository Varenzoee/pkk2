import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      { email: 'kadis@gmail.com', username: 'kadis', roleId: 1, password: '12345678' },
      { email: 'kabid@gmail.com', username: 'kabid', roleId: 2, password: '12345678' },
    ])
  }
}
