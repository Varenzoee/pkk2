import { BaseModel, beforeCreate, beforeSave, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

export default class Score extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static generateId(score: Score) {
    score.id = nanoid()
  }

  @column()
  public employeeId: string

  @column()
  public month: number

  @column()
  public year: number

  @column()
  public attendance: number

  @column()
  public integrity: number

  @column()
  public responsibility: number

  @column()
  public teamwork: number

  @column()
  public skill: number

  @column()
  public creativity: number

  @column()
  public finalScore?: number

  @beforeCreate()
  public static generateFinalScoreBC(score: Score) {
    score.finalScore =
      score.attendance +
      score.integrity +
      score.responsibility +
      score.teamwork +
      score.skill +
      score.creativity
  }

  @beforeUpdate()
  public static generateFinalScoreBU(score: Score) {
    score.finalScore =
      score.attendance +
      score.integrity +
      score.responsibility +
      score.teamwork +
      score.skill +
      score.creativity
  }

  @beforeSave()
  public static generateFinalScoreBS(score: Score) {
    score.finalScore =
      score.attendance +
      score.integrity +
      score.responsibility +
      score.teamwork +
      score.skill +
      score.creativity
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
