const {ApolloServer} = require("apollo-server-express")
const express = require('express');
const typeDefs = require("./typsDefs")
const resolvers =  require("./resolvers")
const server = new ApolloServer({ typeDefs, resolvers, playground:true });
const app = express()

server.applyMiddleware({ app , path: '/graphql' });

(async () => {
await app.listen(4002)
console.log("server start on port 4002 & yopta", new Date().toISOString())
})()

