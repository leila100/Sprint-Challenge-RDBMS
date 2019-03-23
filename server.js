const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger("dev"))

server.get("/", (req, res) => {
  res.status(200).json("Welcome to -- Sprint Challenge - RDMS? -- ")
})

module.exports = server
