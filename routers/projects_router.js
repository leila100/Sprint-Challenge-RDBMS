const express = require("express")
const router = express.Router()

const projectsDB = require("../data/projects/projects_db")

router.post("/", (req, res) => {
  const { proj_name, proj_description, proj_completed } = req.body
  if (!proj_name || !proj_description || proj_completed === null)
    res.status(400).json({
      errorMessage:
        "Please provide the project name, description, and completed flag."
    })
  else
    projectsDB
      .addProject(req.body)
      .then(projectId => res.status(201).json(projectId))
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the project to the database"
        })
      )
})

module.exports = router
