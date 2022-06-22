const {ApolloServer, gql } = require("apollo-server-express")
const express = require('express');
const {graphqlHTTP} = require("express-graphql")
const typeDefs = require("./typsDefs")
const resolvers =  require("./resolvers")
const server = new ApolloServer({ typeDefs, resolvers, playground:true });
const PORT = 4002;
const app = express()
const cors = require('cors')

server.applyMiddleware({ app , path: '/graphql' });

(async () => {
await app.listen(PORT)
})()

