const {ApolloServer, gql } = require("apollo-server-express")
const express = require('express');
const {graphqlHTTP} = require("express-graphql")
const typeDefs = require("./typsDefs")
const resolvers =  require("./resolvers")
const server = new ApolloServer({ typeDefs, resolvers, playground:true });
// const server = require("express")
const PORT = 4002;
// const postTask = require("./routes/postTask");
// const getTask = require('./routes/getTask')
// const patchTask = require('./routes/patchTask')
// const deleteTask = require('./routes/deleteTask')
const app = express()
const cors = require('cors')

server.applyMiddleware({ app , path: '/graphql' });

(async () => {
await app.listen(PORT)
})()

