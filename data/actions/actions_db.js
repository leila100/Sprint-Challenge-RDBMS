const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  addAction,
  getAll
}

function addAction(action) {
  return db("actions")
    .insert(action)
    .then(ids => ({ id: ids[0] }))
}

function getAll() {
  return db("actions")
}
