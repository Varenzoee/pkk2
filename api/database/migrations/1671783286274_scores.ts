import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'scores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('employee_id').references('id').inTable('employees').onDelete('CASCADE')
      table.tinyint('month')
      table.smallint('year')
      table.tinyint('attendance')
      table.tinyint('integrity')
      table.tinyint('responsibility')
      table.tinyint('teamwork')
      table.tinyint('skill')
      table.tinyint('creativity')
      table.tinyint('final_score')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
