const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")

const projectsRouter = require("./routers/projects_router")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger("dev"))

server.use("/api/projects", projectsRouter)

server.get("/", (req, res) => {
  res.status(200).json("Welcome to -- Sprint Challenge - RDMS -- ")
})

module.exports = server
