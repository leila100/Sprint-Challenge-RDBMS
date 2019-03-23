exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments()
    tbl.string("action_description").notNullable()
    tbl.string("notes").notNullable()
    tbl.boolean("action_completed").notNullable()
    tbl
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions")
}
