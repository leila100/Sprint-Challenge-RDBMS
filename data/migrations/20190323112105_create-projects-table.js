exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments()
    tbl.string("proj_name").notNullable()
    tbl.string("proj_description").notNullable()
    tbl.boolean("proj_completed").notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects")
}
