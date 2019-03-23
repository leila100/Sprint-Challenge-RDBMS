const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  addProject,
  getById
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(ids => ({ id: ids[0] }))
}

function getById(id) {
  return db
    .select(
      "projects.id as project_id",
      "proj_name",
      "proj_description",
      "proj_completed",
      "actions.*"
    )
    .from("projects")
    .innerJoin("actions", "actions.project_id", "projects.id")
    .where({ "projects.id": Number(id) })
}
