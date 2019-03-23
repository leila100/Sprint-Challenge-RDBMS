const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  addAction,
  getAll,
  remove,
  update,
  getById
}

function addAction(action) {
  return db("actions")
    .insert(action)
    .then(ids => ({ id: ids[0] }))
}

function getAll() {
  return db("actions")
}

function getById(id) {
  return db
    .select("actions.*", "projects.proj_name")
    .from("actions")
    .innerJoin("projects", "projects.id", "actions.project_id")
    .where({ "actions.id": Number(id) })
    .first()
}

function remove(id) {
  return db("actions")
    .where({ id: Number(id) })
    .del()
}

function update(id, action) {
  return db("actions")
    .where({ id: Number(id) })
    .update(action)
}
