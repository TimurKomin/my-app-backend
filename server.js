const express = require('express');
const server = express()
const PORT = 4002;
const postTask = require("./routes/postTask");
const getTask = require('./routes/getTask')
const patchTask = require('./routes/patchTask')
const arrTasks = require('./routes/postTask')
const deleteTask = require('./routes/deleteTask')

server.use(express.json());
server.use("/postTask", postTask);
server.use('/getTask', getTask)
server.use('/patchTask', patchTask)
server.use('/deleteTask', deleteTask)


server.listen(PORT)
