import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Score from './Score'
import { nanoid } from 'nanoid'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static generateId(employee: Employee) {
    employee.id = nanoid()
  }

  @column()
  public nip: number

  @column()
  public fullname: string

  @column()
  public bidang: 'PAD' | 'PKMED' | 'BPD'

  @column()
  public phone: string

  @column()
  public email: string

  @hasMany(() => Score)
  public scores: HasMany<typeof Score>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
