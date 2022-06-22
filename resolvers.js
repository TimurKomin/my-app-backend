const { ApolloError } = require('apollo-server-express')
const task = require('./models/task')
const getTask = require('./routes/getTask')
const postTask = require('./routes/postTask')
const patchTask = require('./routes/patchTask')
const deleteTask = require('./routes/deleteTask')
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