const { gql } = require("apollo-server")

const typsDefs = gql`
    type Task {
        title: String!
        done: Boolean!
        created_at: String
        updated_at: String
        uuid: ID!
    }
    type Tasks {
        task: [Task!]!,
        count:Int
    }
    type Query {
        tasks(allPerPage:Int, filterBy:String, page:Int, order:String): Tasks
    }

    type Mutation {
        addTask(title: String!, done: Boolean): Task
        changeTask(title: String, done: Boolean, uuid: String!): Task
        removeTask(uuid: String!): Task!
    }
`
module.exports =  typsDefs
