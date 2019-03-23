const express = require("express")
const router = express.Router()

const actionsDB = require("../data/actions/actions_db")
const projectsDB = require("../data/projects/projects_db")

router.post("/", (req, res) => {
  const { action_description, notes, action_completed, project_id } = req.body
  if (!action_description || !notes || action_completed === null || !project_id)
    res.status(400).json({
      errorMessage:
        "Please provide the action description, notes, completed flag, and project_id."
    })
  // Check that project id is valid
  else
    actionsDB
      .addAction(req.body)
      .then(actionId => res.status(201).json(actionId))
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the action to the database"
        })
      )
})

module.exports = router
