const getTask = require('./resolvers/getTask')
const postTask = require('./resolvers/postTask')
const patchTask = require('./resolvers/patchTask')
const deleteTask = require('./resolvers/deleteTask')
const resolvers = {

    Query: {
      tasks: async () => await getTask({allPerPage: 100, filterBy: "", order: "desc", page: 0})
    },
    Mutation: {
          addTask: async (_, input, context) => await postTask(input),
          changeTask: async (_, input, context) => await patchTask(input),
          removeTask: async (_, input, context) => await deleteTask(input)
    },
  }

module.exports = resolvers