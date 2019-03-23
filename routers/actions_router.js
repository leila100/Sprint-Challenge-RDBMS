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
  else {
    projectsDB.getById(project_id).then(project => {
      if (project.length > 0) {
        actionsDB
          .addAction(req.body)
          .then(actionId => res.status(201).json(actionId))
          .catch(err =>
            res.status(500).json({
              error:
                "There was an error while saving the action to the database"
            })
          )
      } else {
        res.status(400).json({
          errorMessage: "Please provide a valid id for the project."
        })
      }
    })
  }
})

router.get("/", (req, res) => {
  actionsDB
    .getAll()
    .then(actions => {
      const projects = actions.map(action => action.project_id) // Get all the projects ids
      const uniqueProjs = projects.filter(
        (project, index) => projects.indexOf(project) >= index
      ) // remove all duplicates

      let actionsProj = []
      uniqueProjs.forEach(proj => {
        // Build an array of actions that have the same project_id
        let a = actions.filter(action => action.project_id === proj)
        a = a.map(action => {
          return {
            ...action,
            completed: action.action_completed ? true : false
          }
        })
        actionsProj.push(a)
      })
      res.status(200).json(actionsProj)
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." })
    )
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  actionsDB
    .remove(id)
    .then(count => {
      if (count > 0) res.status(200).json(count)
      else
        res
          .status(400)
          .json({ errorMessage: "Please provide a valid action id." })
    })
    .catch(err =>
      res.status(500).json({
        error: "The action could not be removed from the database."
      })
    )
})

router.put("/:id", (req, res) => {
  const { id } = req.params
  const { action_description, notes, action_completed, project_id } = req.body
  if (!action_description || !notes || action_completed === null || !project_id)
    res.status(400).json({
      errorMessage:
        "Please provide the action description, notes, completed flag, and project_id."
    })
  // Check that project id is valid
  else {
    projectsDB.getById(project_id).then(project => {
      if (project.length > 0) {
        actionsDB
          .update(id, req.body)
          .then(count => res.status(201).json(count))
          .catch(err =>
            res.status(500).json({
              error:
                "There was an error while updating the action in the database"
            })
          )
      }
    })
  }
})

module.exports = router
