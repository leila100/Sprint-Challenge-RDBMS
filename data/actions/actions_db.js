const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  addAction,
  getAll,
  remove
}

function addAction(action) {
  return db("actions")
    .insert(action)
    .then(ids => ({ id: ids[0] }))
}

function getAll() {
  return db("actions")
}

function remove(id) {
  return db("actions")
    .where({ id: Number(id) })
    .del()
}
