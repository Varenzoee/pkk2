import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'scores'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('user_id').references('id').inTable('users').after('id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('user_id')
      table.dropColumn('user_id')
    })
  }
}
