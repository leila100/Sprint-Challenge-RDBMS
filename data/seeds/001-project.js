exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          proj_name: "Project 1",
          proj_description: "This is a description for project 1",
          proj_completed: false
        },
        {
          proj_name: "Project 2",
          proj_description: "This is a description for project 2",
          proj_completed: true
        },
        {
          proj_name: "Project 3",
          proj_description: "This is a description for project 3",
          proj_completed: false
        },
        {
          proj_name: "Project 4",
          proj_description: "This is a description for project 4",
          proj_completed: false
        },
        {
          proj_name: "Project 5",
          proj_description: "This is a description for project 5",
          proj_completed: true
        },
        {
          proj_name: "Project 6",
          proj_description: "This is a description for project 6",
          proj_completed: false
        }
      ])
    })
}
