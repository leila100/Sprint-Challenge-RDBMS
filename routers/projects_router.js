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

router.get("/:id", (req, res) => {
  const { id } = req.params
  projectsDB
    .getById(id)
    .then(project => {
      if (project) {
        const actions = project.map(action => {
          return {
            id: action.id,
            description: action.action_description,
            notes: action.notes,
            completed: action.action_completed ? true : false
          }
        })
        const proj = {
          id: project[0].project_id,
          name: project[0].proj_name,
          description: project[0].proj_description,
          completed: project[0].proj_completed ? true : false,
          actions: actions
        }
        res.status(200).json(proj)
      } else
        res.status(400).json({
          errorMessage: "Please provide a valid id for the project."
        })
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." })
    )
})

module.exports = router
