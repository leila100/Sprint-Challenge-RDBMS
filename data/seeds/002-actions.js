exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          project_id: 1,
          action_description: "THis is a description for the action 1",
          notes: "These are the notes for the action 1",
          action_completed: true
        },
        {
          project_id: 1,
          action_description: "THis is a description for the action 2",
          notes: "These are the notes for the action 2",
          action_completed: false
        },
        {
          project_id: 3,
          action_description: "THis is a description for the action 3",
          notes: "These are the notes for the action 3",
          action_completed: false
        },
        {
          project_id: 1,
          action_description: "THis is a description for the action 4",
          notes: "These are the notes for the action 4",
          action_completed: true
        },
        {
          project_id: 2,
          action_description: "THis is a description for the action 5",
          notes: "These are the notes for the action 5",
          action_completed: false
        },
        {
          project_id: 3,
          action_description: "THis is a description for the action 6",
          notes: "These are the notes for the action 6",
          action_completed: false
        }
      ])
    })
}
