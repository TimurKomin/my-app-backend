const {ApolloServer, gql } = require("apollo-server")

const typsDefs = gql`
type Task {
    title: String
    done: Boolean
    createdAt: String
    updatedAt: String
    uuid: ID
}


    type Query {
        tasks: [Task!]!
    }

    type Mutation {
        addTask(title: String!, done: Boolean): Task
        changeTask(title: String!, done: Boolean!, uuid: String!): Task
        removeTask(uuid: String!): Task
    }








`
module.exports =  typsDefs
