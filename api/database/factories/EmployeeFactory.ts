import Employee from 'App/Models/Employee'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Employee, ({ faker }) => {
  return {
    nip: '' + faker.datatype.bigInt({ min: 1000000000, max: 9999999999 }),
    email: faker.internet.email(),
    fullname: faker.name.fullName(),
    phone: faker.phone.number(),
  }
}).build()
